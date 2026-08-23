'use server';

import dbConnect from '@/lib/db';
import { Product } from '@/lib/models/product';
import { getSession } from '@/lib/auth';
import { logAuditAction } from '@/lib/actions/audit';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  if (!allowedRoles.includes(session.role as string)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return session;
}

export async function getInventoryList() {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER']);
    await dbConnect();

    const products = await Product.find()
      .populate('category', 'name')
      .sort({ updatedAt: -1 })
      .lean();

    const inventoryItems = products.map((p: any) => {
      const isVariant = p.hasVariants && Array.isArray(p.variants) && p.variants.length > 0;
      const totalStock = isVariant
        ? p.variants.reduce((sum: number, v: any) => sum + (Number(v.stock) || 0), 0)
        : Number(p.stockQuantity) || 0;
      
      const reserved = Number(p.reservedQuantity) || 0;
      const available = Math.max(0, totalStock - reserved);
      const threshold = Number(p.lowStockThreshold) || 5;

      let status = 'IN_STOCK';
      if (available === 0) {
        status = 'OUT_OF_STOCK';
      } else if (available <= threshold) {
        status = 'LOW_STOCK';
      }

      return {
        _id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        sku: p.baseSku || 'N/A',
        category: p.category?.name || 'Uncategorized',
        categoryId: p.category?._id?.toString() || '',
        hasVariants: p.hasVariants || false,
        variants: (p.variants || []).map((v: any) => ({
          _id: v._id?.toString() || '',
          name: v.name,
          sku: v.sku,
          price: v.price,
          stock: v.stock || 0,
        })),
        stock: totalStock,
        reserved,
        available,
        lowStockThreshold: threshold,
        status,
        updatedAt: p.updatedAt?.toISOString(),
      };
    });

    return { success: true, data: inventoryItems };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateStockLevel(params: {
  productId: string;
  variantId?: string;
  adjustment: number; // positive to add, negative to subtract
  reason?: string;
}) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await Product.findById(params.productId).session(session);
      if (!product) {
        throw new Error('Product not found');
      }

      if (params.variantId && product.hasVariants) {
        const variant = product.variants.id(params.variantId);
        if (!variant) {
          throw new Error('Variant not found');
        }
        variant.stock = Math.max(0, (variant.stock || 0) + params.adjustment);
        
        // Recalculate total product stock
        product.stockQuantity = product.variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0);
      } else {
        product.stockQuantity = Math.max(0, (product.stockQuantity || 0) + params.adjustment);
      }

      // Re-evaluate stockStatus
      const threshold = product.lowStockThreshold || 5;
      const reserved = product.reservedQuantity || 0;
      const available = Math.max(0, product.stockQuantity - reserved);

      if (available === 0) {
        product.stockStatus = 'OUT_OF_STOCK';
      } else if (available <= threshold) {
        product.stockStatus = 'LOW_STOCK';
      } else {
        product.stockStatus = 'IN_STOCK';
      }

      await product.save({ session });
      await session.commitTransaction();
      session.endSession();

      await logAuditAction({
        action: 'INVENTORY_STOCK_ADJUSTED',
        entity: 'Product',
        entityId: params.productId,
        metadata: {
          variantId: params.variantId,
          adjustment: params.adjustment,
          newStockQuantity: product.stockQuantity,
          reason: params.reason || 'Manual Adjustment',
        },
      });

      revalidatePath('/admin/inventory');
      revalidatePath('/admin/products');
      return { success: true, newStock: product.stockQuantity, stockStatus: product.stockStatus };
    } catch (txError: any) {
      await session.abortTransaction();
      session.endSession();
      throw txError;
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
