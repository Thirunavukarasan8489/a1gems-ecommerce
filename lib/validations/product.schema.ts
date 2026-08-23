import { z } from 'zod';

export const VariantSchema = z.object({
  name: z.string().min(1, 'Variant name is required'),
  sku: z.string().min(1, 'Variant SKU is required'),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().int().min(0).default(0),
});

export const ImageSchema = z.object({
  url: z.string().optional(),
  altText: z.string().optional(),
});

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  category: z.string().optional(),
  categoryId: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  
  basePrice: z.coerce.number().min(0, 'Base price must be a positive number'),
  comparePrice: z.coerce.number().optional().nullable(),
  baseSku: z.string().min(1, 'SKU is required'),
  stockQuantity: z.coerce.number().int().min(0).default(0),
  
  hasVariants: z.boolean().default(false),
  variants: z.array(VariantSchema).optional(),
  
  reservedQuantity: z.coerce.number().int().min(0).default(0),
  lowStockThreshold: z.coerce.number().int().min(0).default(5),
  stockStatus: z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']).default('IN_STOCK'),
  status: z.enum(['ACTIVE', 'DRAFT']).default('DRAFT'),
  
  purchaseType: z.enum(['ENQUIRE_ONLY', 'BUY_ONLY', 'BUY_ENQUIRE']),
  whatsappEnabled: z.boolean().default(false),
  
  material: z.string().optional(),
  stone: z.string().optional(),
  size: z.string().optional(),
  weight: z.string().optional(),
  origin: z.string().optional(),
  certification: z.string().optional(),
  
  primaryImage: ImageSchema.optional(),
  gallery: z.array(ImageSchema).optional(),
  
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
