import dbConnect from '@/lib/db';
import { Product } from '@/lib/models/product';
import { Category } from '@/lib/models/category';
import type { Product as PublicProduct } from '@/lib/types';
import { unstable_cache } from 'next/cache';

// Prevent Turbopack from tree-shaking the models
if (!Category) console.warn("Category model not loaded");

const FALLBACK_PRODUCTS: PublicProduct[] = [
  {
    id: "prod-1",
    name: "Natural Blue Sapphire (Neelam) 4.25 Carat",
    slug: "blue-sapphire-neelam-425-carat",
    categorySlug: "blue-sapphire",
    shortDescription: "Unheated Ceylon royal blue sapphire with GIA certificate confirmation.",
    description: "An exceptional 4.25 carat unheated natural blue sapphire sourced from Ratnapura, Sri Lanka. Displays vivid royal blue saturation and superior clarity.",
    sellingPrice: 325000,
    comparePrice: 380000,
    sku: "BS-CEY-425",
    stockQuantity: 3,
    reservedQuantity: 0,
    lowStockThreshold: 1,
    purchaseType: "BUY_AND_ENQUIRE",
    enquiryEnabled: true,
    whatsappEnabled: true,
    specifications: {
      material: "Natural Corundum",
      stone: "Blue Sapphire",
      size: "9.2 x 7.5 mm",
      weight: "4.25 Carat",
      origin: "Ceylon (Sri Lanka)",
      certification: "GIA Certified",
    },
    gemColor: "#1f4fd8",
    gallery: 3,
    hasVariants: false,
    variants: [],
    seo: { metaTitle: "Natural Blue Sapphire 4.25 Carat" },
    featured: true,
    bestseller: true,
    rating: 5,
    reviewCount: 14,
    published: true,
  },
  {
    id: "prod-2",
    name: "Pigeon Blood Burmese Ruby 3.10 Carat",
    slug: "pigeon-blood-burmese-ruby-310-carat",
    categorySlug: "ruby",
    shortDescription: "Unheated Mogok ruby with intense crimson hue and GRS certification.",
    description: "Rare 3.10 carat pigeon blood ruby from Mogok, Myanmar. Completely unheated with brilliant light return.",
    sellingPrice: 480000,
    comparePrice: 550000,
    sku: "RB-MOG-310",
    stockQuantity: 2,
    reservedQuantity: 0,
    lowStockThreshold: 1,
    purchaseType: "ENQUIRY_ONLY",
    enquiryEnabled: true,
    whatsappEnabled: true,
    specifications: {
      material: "Natural Corundum",
      stone: "Ruby",
      size: "8.5 x 6.8 mm",
      weight: "3.10 Carat",
      origin: "Mogok (Myanmar)",
      certification: "GRS Certified",
    },
    gemColor: "#c81e4a",
    gallery: 4,
    hasVariants: false,
    variants: [],
    seo: { metaTitle: "Burmese Ruby 3.10 Carat" },
    featured: true,
    bestseller: true,
    rating: 5,
    reviewCount: 9,
    published: true,
  },
  {
    id: "prod-3",
    name: "Vivid Green Zambian Emerald 5.15 Carat",
    slug: "vivid-green-zambian-emerald-515-carat",
    categorySlug: "emerald",
    shortDescription: "Untreated emerald with vivid green hue and IGI certification.",
    description: "Stunning 5.15 carat Zambian emerald showing intense green hue and minimal minor oiling.",
    sellingPrice: 290000,
    comparePrice: 340000,
    sku: "EM-ZAM-515",
    stockQuantity: 4,
    reservedQuantity: 0,
    lowStockThreshold: 2,
    purchaseType: "BUY_AND_ENQUIRE",
    enquiryEnabled: true,
    whatsappEnabled: true,
    specifications: {
      material: "Natural Beryl",
      stone: "Emerald",
      size: "11.0 x 9.2 mm",
      weight: "5.15 Carat",
      origin: "Zambia",
      certification: "IGI Certified",
    },
    gemColor: "#10b481",
    gallery: 3,
    hasVariants: false,
    variants: [],
    seo: { metaTitle: "Zambian Emerald 5.15 Carat" },
    featured: true,
    bestseller: false,
    rating: 4.9,
    reviewCount: 18,
    published: true,
  },
  {
    id: "prod-4",
    name: "7 Chakra Healing Crystal Bead Bracelet",
    slug: "7-chakra-healing-crystal-bead-bracelet",
    categorySlug: "bracelets",
    shortDescription: "Hand-strung natural crystal bracelet for chakra alignment.",
    description: "Crafted with 7 authentic natural gemstone beads representing root to crown chakras.",
    sellingPrice: 1850,
    comparePrice: 2500,
    sku: "BR-CHK-007",
    stockQuantity: 25,
    reservedQuantity: 0,
    lowStockThreshold: 5,
    purchaseType: "BUY_ONLY",
    enquiryEnabled: false,
    whatsappEnabled: true,
    specifications: {
      material: "Natural Stones & Elastic Thread",
      stone: "Multi-gemstone",
      size: "8mm beads",
      weight: "35 grams",
      origin: "India",
      certification: "In-house Certified",
    },
    gemColor: "#7e6394",
    gallery: 2,
    hasVariants: false,
    variants: [],
    seo: { metaTitle: "7 Chakra Bead Bracelet" },
    featured: true,
    bestseller: true,
    rating: 5,
    reviewCount: 32,
    published: true,
  },
  {
    id: "prod-5",
    name: "Golden Yellow Sapphire (Pukhraj) 5.80 Carat",
    slug: "golden-yellow-sapphire-pukhraj-580-carat",
    categorySlug: "yellow-sapphire",
    shortDescription: "Unheated Ceylon yellow sapphire for Jupiter astrological benefits.",
    description: "Vibrant 5.80 carat golden yellow sapphire with exceptional brilliance and clarity.",
    sellingPrice: 210000,
    comparePrice: 250000,
    sku: "YS-CEY-580",
    stockQuantity: 3,
    reservedQuantity: 0,
    lowStockThreshold: 1,
    purchaseType: "BUY_AND_ENQUIRE",
    enquiryEnabled: true,
    whatsappEnabled: true,
    specifications: {
      material: "Natural Corundum",
      stone: "Yellow Sapphire",
      size: "10.1 x 8.4 mm",
      weight: "5.80 Carat",
      origin: "Ceylon (Sri Lanka)",
      certification: "GIA Certified",
    },
    gemColor: "#c99a26",
    gallery: 3,
    hasVariants: false,
    variants: [],
    seo: { metaTitle: "Yellow Sapphire Pukhraj 5.80 Carat" },
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 11,
    published: true,
  },
  {
    id: "prod-6",
    name: "Natural South Sea Pearl (Moti) 8.5 Carat",
    slug: "natural-south-sea-pearl-moti-85-carat",
    categorySlug: "pearl",
    shortDescription: "Lustrous round South Sea pearl with smooth surface texture.",
    description: "Premium 8.5 carat South Sea pearl displaying intense silvery-white luster.",
    sellingPrice: 85000,
    comparePrice: 110000,
    sku: "PL-SSP-850",
    stockQuantity: 5,
    reservedQuantity: 0,
    lowStockThreshold: 2,
    purchaseType: "BUY_ONLY",
    enquiryEnabled: false,
    whatsappEnabled: true,
    specifications: {
      material: "Natural Organic Pearl",
      stone: "Pearl",
      size: "11.2 mm round",
      weight: "8.50 Carat",
      origin: "South Sea (Australia)",
      certification: "IGI Certified",
    },
    gemColor: "#e4daea",
    gallery: 2,
    hasVariants: false,
    variants: [],
    seo: { metaTitle: "South Sea Pearl 8.5 Carat" },
    featured: false,
    bestseller: true,
    rating: 4.8,
    reviewCount: 8,
    published: true,
  },
];

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
    sellingPrice: defaultVariant.price || doc.sellingPrice || 0,
    comparePrice: defaultVariant.comparePrice || doc.comparePrice,
    sku: doc.sku || `SKU-${doc._id.toString().substring(0, 6)}`,
    stockQuantity: doc.variants?.reduce((acc: number, v: any) => acc + (v.stock || 0), 0) || doc.stockQuantity || 5,
    reservedQuantity: doc.reservedQuantity || 0,
    lowStockThreshold: defaultVariant.lowStockThreshold || 5,
    purchaseType: doc.purchaseType === 'ENQUIRE_ONLY' ? 'ENQUIRY_ONLY' : 
                  doc.purchaseType === 'BUY_ENQUIRE' ? 'BUY_AND_ENQUIRE' : 'BUY_ONLY',
    enquiryEnabled: doc.purchaseType !== 'BUY_ONLY',
    whatsappEnabled: doc.whatsappEnabled ?? true,
    specifications: {
      material: doc.material || doc.specifications?.material,
      stone: doc.stone || doc.specifications?.stone,
      size: doc.size || doc.specifications?.size,
      weight: doc.weight || doc.specifications?.weight,
      origin: doc.origin || doc.specifications?.origin,
      certification: doc.certification || doc.specifications?.certification,
    },
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
      name: doc.guide.name || doc.guide.title,
      slug: doc.guide.slug,
    } : undefined,
    featured: doc.featured || false,
    bestseller: doc.bestseller || false,
    rating: doc.rating || 5,
    reviewCount: doc.reviewCount || 0,
    published: doc.status === 'ACTIVE' || doc.published !== false,
  };
}

export const getProducts = unstable_cache(async () => {
  try {
    await dbConnect();
    let docs = await Product.find({ status: 'ACTIVE' }).populate('category').lean();
    if (!docs || docs.length === 0) {
      docs = await Product.find({}).populate('category').lean();
    }
    if (docs && docs.length > 0) {
      return docs.map(mapToPublicProduct);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return FALLBACK_PRODUCTS;
}, ['public-products-v6'], { revalidate: 60, tags: ['products'] });

export const getProductBySlug = unstable_cache(async (slug: string) => {
  try {
    await dbConnect();
    let doc = await Product.findOne({ slug, status: 'ACTIVE' }).populate('category').lean();
    if (!doc) {
      doc = await Product.findOne({ slug }).populate('category').lean();
    }
    if (doc) return mapToPublicProduct(doc);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
  }
  return FALLBACK_PRODUCTS.find(p => p.slug === slug) || null;
}, ['public-product-by-slug-v6'], { revalidate: 60, tags: ['products'] });

export const getProductsByCategory = unstable_cache(async (categorySlug: string) => {
  const allProducts = await getProducts();
  const matched = allProducts.filter(p => p.categorySlug === categorySlug);
  return matched.length > 0 ? matched : allProducts.slice(0, 4);
}, ['public-products-by-category-v6'], { revalidate: 60, tags: ['products'] });

export const getFeaturedProducts = unstable_cache(async () => {
  const allProducts = await getProducts();
  const featured = allProducts.filter(p => p.featured);
  return featured.length > 0 ? featured : allProducts;
}, ['public-products-featured-v6'], { revalidate: 60, tags: ['products'] });

export const getBestsellers = unstable_cache(async () => {
  const allProducts = await getProducts();
  const bestsellers = allProducts.filter(p => p.bestseller);
  return bestsellers.length > 0 ? bestsellers : allProducts;
}, ['public-products-bestsellers-v6'], { revalidate: 60, tags: ['products'] });

export const getRelatedProducts = unstable_cache(async (productId: string, categorySlug: string, limit = 6) => {
  const allProducts = await getProducts();
  const sameCategory = allProducts.filter(p => p.id !== productId && p.categorySlug === categorySlug);
  const others = allProducts.filter(p => p.id !== productId && p.categorySlug !== categorySlug);
  return sameCategory.concat(others).slice(0, limit);
}, ['public-products-related-v6'], { revalidate: 60, tags: ['products'] });
