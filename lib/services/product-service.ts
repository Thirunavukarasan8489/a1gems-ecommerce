import dbConnect from '@/lib/db';
import { Product } from '@/lib/models/product';
import { Category } from '@/lib/models/category';
import { Guide } from '@/lib/models/guide';
import type { Product as PublicProduct } from '@/lib/types';
import { unstable_cache } from 'next/cache';


// Prevent Turbopack from tree-shaking the models
if (!Category) console.warn("Category model not loaded");
if (!Guide) console.warn("Guide model not loaded");

function mapToPublicProduct(doc: any): PublicProduct {
  const defaultVariant = doc.variants?.[0] || {};
  const categoryColor = doc.category?.gemColor || '#000000';
  
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    categorySlug: doc.category?.slug || '',
    shortDescription: doc.shortDescription || '',
    description: doc.description || '',
    
    // In paise. Use variant 0's price or fallback to 0.
    sellingPrice: defaultVariant.price || 0,
    comparePrice: defaultVariant.comparePrice,
    
    sku: doc.sku || `SKU-${doc._id.toString().substring(0, 6)}`,
    stockQuantity: doc.variants?.reduce((acc: number, v: any) => acc + (v.stock || 0), 0) || 0,
    reservedQuantity: doc.reservedQuantity || 0,
    lowStockThreshold: defaultVariant.lowStockThreshold || 5,
    
    purchaseType: doc.purchaseType === 'ENQUIRE_ONLY' ? 'ENQUIRY_ONLY' : 
                  doc.purchaseType === 'BUY_ENQUIRE' ? 'BUY_AND_ENQUIRE' : 'BUY_ONLY',
    enquiryEnabled: doc.purchaseType !== 'BUY_ONLY',
    whatsappEnabled: doc.whatsappEnabled || false,
    
    specifications: {
      material: doc.material,
      stone: doc.stone,
      size: doc.size,
      weight: doc.weight,
      origin: doc.origin,
      certification: doc.certification,
    },
    
    // Fallback colour if none set in DB (schema lacks gemColor atm)
    gemColor: doc.gemColor || categoryColor,
    gallery: doc.gallery?.length || 0,
    primaryImage: doc.primaryImage?.url?.trim() ? { url: doc.primaryImage.url, altText: doc.primaryImage.altText } : undefined,
    images: doc.gallery?.filter((g: any) => g.url?.trim()).map((g: any) => ({ url: g.url, altText: g.altText })) || [],
    
    hasVariants: doc.hasVariants || false,
    variants: doc.variants?.map((v: any) => ({
      name: v.name,
      caratApprox: v.caratApprox,
      size: v.size,
      price: v.price || 0,
      comparePrice: v.comparePrice,
      stock: v.stock || 0,
      lowStockThreshold: v.lowStockThreshold || 5,
    })) || [],

    seo: {
      metaTitle: doc.metaTitle,
      metaDescription: doc.metaDescription,
      keywords: doc.keywords,
      ogImage: doc.ogImage,
    },
    
    guide: doc.guide ? {
      name: doc.guide.name || doc.guide.title, // Just in case it's title
      slug: doc.guide.slug,
    } : undefined,

    featured: doc.featured || false,
    bestseller: doc.bestseller || false,
    rating: doc.rating || 5,
    reviewCount: doc.reviewCount || 0,
    published: doc.status === 'ACTIVE',
  };
}

export const getProducts = unstable_cache(async () => {
  await dbConnect();
  const docs = await Product.find({ status: 'ACTIVE' })
    .populate('category')
    .populate({ path: 'guide', strictPopulate: false })
    .lean();
  return docs.map(mapToPublicProduct);
}, ['public-products-v4'], { revalidate: 60, tags: ['products'] });

export const getProductBySlug = unstable_cache(async (slug: string) => {
  await dbConnect();
  const doc = await Product.findOne({ slug, status: 'ACTIVE' })
    .populate('category')
    .populate({ path: 'guide', strictPopulate: false })
    .lean();
  if (!doc) return null;
  return mapToPublicProduct(doc);
}, ['public-product-by-slug-v4'], { revalidate: 60, tags: ['products'] });

export const getProductsByCategory = unstable_cache(async (categorySlug: string) => {
  await dbConnect();
  // We need to match the category slug.
  const docs = await Product.find({ status: 'ACTIVE' }).populate('category').lean();
  const mapped = docs.map(mapToPublicProduct);
  return mapped.filter(p => p.categorySlug === categorySlug);
}, ['public-products-by-category-v3'], { revalidate: 60, tags: ['products'] });

export const getFeaturedProducts = unstable_cache(async () => {
  await dbConnect();
  const docs = await Product.find({ status: 'ACTIVE', featured: true }).populate('category').lean();
  return docs.map(mapToPublicProduct);
}, ['public-products-featured-v3'], { revalidate: 60, tags: ['products'] });

export const getBestsellers = unstable_cache(async () => {
  await dbConnect();
  const docs = await Product.find({ status: 'ACTIVE', bestseller: true }).populate('category').lean();
  return docs.map(mapToPublicProduct);
}, ['public-products-bestsellers-v3'], { revalidate: 60, tags: ['products'] });

export const getRelatedProducts = unstable_cache(async (productId: string, categorySlug: string, limit = 6) => {
  await dbConnect();
  // Fetch all active products
  const docs = await Product.find({ status: 'ACTIVE' }).populate('category').lean();
  const mapped = docs.map(mapToPublicProduct);
  
  const sameCategory = mapped.filter(p => p.id !== productId && p.categorySlug === categorySlug);
  const otherFeatured = mapped.filter(p => p.id !== productId && p.categorySlug !== categorySlug && p.featured);
  
  return sameCategory.concat(otherFeatured).slice(0, limit);
}, ['public-products-related-v3'], { revalidate: 60, tags: ['products'] });
