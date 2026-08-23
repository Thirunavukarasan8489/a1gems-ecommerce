'use server';

import dbConnect from '@/lib/db';
import { Product } from '@/lib/models/product';
import { Lead } from '@/lib/models/lead';
import { Order } from '@/lib/models/order';
import { getSession } from '@/lib/auth';
import { logAuditAction } from '@/lib/actions/audit';
import { deleteMediaByUrl } from '@/lib/actions/media.actions';
import { ProductSchema } from '@/lib/validations/product.schema';
import { revalidatePath } from 'next/cache';

async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  if (!allowedRoles.includes(session.role as string)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return session;
}

// Generate guaranteed unique slug from product name
export async function generateUniqueProductSlug(name: string, excludeId?: string): Promise<string> {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'product';

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: any = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const exists = await Product.findOne(query).select('_id').lean();
    if (!exists) {
      return slug;
    }
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

export async function getProducts() {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER']);
    await dbConnect();
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(products)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getProductById(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER']);
    await dbConnect();
    const product = await Product.findById(id).populate('category', 'name').lean();
    if (!product) return { success: false, error: 'Product not found' };
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createProduct(data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    
    const parsed = ProductSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }
    const validatedData = parsed.data;

    await dbConnect();
    
    // Automatically generate guaranteed unique slug on backend
    const slug = await generateUniqueProductSlug(validatedData.name);

    // Handle Category reference
    const mappedData: any = { 
      ...validatedData, 
      slug,
      category: validatedData.categoryId || validatedData.category 
    };
    delete mappedData.categoryId;

    // If variants enabled, compute aggregate stock and default base price if needed
    if (mappedData.hasVariants && Array.isArray(mappedData.variants) && mappedData.variants.length > 0) {
      const totalVariantStock = mappedData.variants.reduce((acc: number, v: any) => acc + (Number(v.stock) || 0), 0);
      mappedData.stockQuantity = totalVariantStock;
      
      if (!mappedData.basePrice || mappedData.basePrice === 0) {
        mappedData.basePrice = Number(mappedData.variants[0].price) || 0;
      }
      if (!mappedData.baseSku || mappedData.baseSku === '') {
        mappedData.baseSku = mappedData.variants[0].sku || `${slug.substring(0, 8).toUpperCase()}-BASE`;
      }
    }

    // Determine stockStatus
    const threshold = Number(mappedData.lowStockThreshold) || 5;
    const currentStock = Number(mappedData.stockQuantity) || 0;
    if (currentStock === 0) {
      mappedData.stockStatus = 'OUT_OF_STOCK';
    } else if (currentStock <= threshold) {
      mappedData.stockStatus = 'LOW_STOCK';
    } else {
      mappedData.stockStatus = 'IN_STOCK';
    }
    
    const product = await Product.create(mappedData);
    
    await logAuditAction({
      action: 'PRODUCT_CREATED',
      entity: 'Product',
      entityId: product._id.toString(),
      metadata: { name: product.name, sku: product.baseSku, slug: product.slug }
    });

    revalidatePath('/admin/products');
    revalidatePath('/admin/inventory');
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    
    const parsed = ProductSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }
    const validatedData = parsed.data;

    await dbConnect();
    
    const mappedData: any = { ...validatedData };
    if (mappedData.categoryId) {
      mappedData.category = mappedData.categoryId;
      delete mappedData.categoryId;
    }

    // Ensure slug is uniquely maintained if name changed
    if (mappedData.name && !mappedData.slug) {
      mappedData.slug = await generateUniqueProductSlug(mappedData.name, id);
    }
    
    // If variants enabled, compute aggregate stock
    if (mappedData.hasVariants && Array.isArray(mappedData.variants) && mappedData.variants.length > 0) {
      mappedData.stockQuantity = mappedData.variants.reduce((acc: number, v: any) => acc + (Number(v.stock) || 0), 0);
    }

    // Re-evaluate stockStatus
    if (mappedData.stockQuantity !== undefined) {
      const threshold = Number(mappedData.lowStockThreshold) || 5;
      const currentStock = Number(mappedData.stockQuantity) || 0;
      if (currentStock === 0) {
        mappedData.stockStatus = 'OUT_OF_STOCK';
      } else if (currentStock <= threshold) {
        mappedData.stockStatus = 'LOW_STOCK';
      } else {
        mappedData.stockStatus = 'IN_STOCK';
      }
    }

    // Fetch old product to find orphaned images
    const oldProduct = await Product.findById(id).lean();

    const product = await Product.findByIdAndUpdate(id, mappedData, { new: true });
    
    // Clean up orphaned images asynchronously
    if (oldProduct) {
      const oldImages = new Set<string>();
      if (oldProduct.primaryImage?.url) oldImages.add(oldProduct.primaryImage.url);
      if (oldProduct.gallery) oldProduct.gallery.forEach((g: any) => { if (g.url) oldImages.add(g.url); });

      const newImages = new Set<string>();
      if (product.primaryImage?.url) newImages.add(product.primaryImage.url);
      if (product.gallery) product.gallery.forEach((g: any) => { if (g.url) newImages.add(g.url); });

      const orphanedImages = Array.from(oldImages).filter(url => !newImages.has(url));
      
      // Fire and forget
      Promise.allSettled(orphanedImages.map(url => deleteMediaByUrl(url)));
    }

    await logAuditAction({
      action: 'PRODUCT_UPDATED',
      entity: 'Product',
      entityId: id,
      metadata: { name: product?.name }
    });

    revalidatePath('/admin/products');
    revalidatePath('/admin/inventory');
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    // Check references
    const orderCount = await Order.countDocuments({ 'items.productId': id });
    if (orderCount > 0) {
      throw new Error(`Cannot delete: Product is referenced in ${orderCount} order(s).`);
    }

    const leadCount = await Lead.countDocuments({ product: id });
    if (leadCount > 0) {
      throw new Error(`Cannot delete: Product is referenced in ${leadCount} lead(s).`);
    }

    const productToDelete = await Product.findById(id).lean();
    if (!productToDelete) throw new Error('Product not found');

    await Product.findByIdAndDelete(id);
    
    // Clean up images asynchronously
    const urlsToDelete = new Set<string>();
    if (productToDelete.primaryImage?.url) urlsToDelete.add(productToDelete.primaryImage.url);
    if (productToDelete.gallery) {
      productToDelete.gallery.forEach((g: any) => { if (g.url) urlsToDelete.add(g.url); });
    }
    
    // Fire and forget
    Promise.allSettled(Array.from(urlsToDelete).map(url => deleteMediaByUrl(url)));

    await logAuditAction({
      action: 'PRODUCT_DELETED',
      entity: 'Product',
      entityId: id,
    });

    revalidatePath('/admin/products');
    revalidatePath('/admin/inventory');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
