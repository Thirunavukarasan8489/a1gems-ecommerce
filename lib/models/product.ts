import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    // Basic
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    shortDescription: { type: String },
    description: { type: String },
    
    // Pricing & Inventory (Base)
    basePrice: { type: Number, required: true },
    comparePrice: { type: Number },
    baseSku: { type: String, required: true, unique: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    
    // Variants
    hasVariants: { type: Boolean, default: false },
    variants: [{
      name: { type: String, required: true },
      sku: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true, default: 0 },
    }],
    
    // Inventory
    reservedQuantity: { type: Number, required: true, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    stockStatus: { type: String, enum: ['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'], default: 'IN_STOCK' },
    status: { type: String, enum: ['ACTIVE', 'DRAFT'], default: 'DRAFT' },
    
    // Purchase Config
    purchaseType: { 
      type: String, 
      enum: ['ENQUIRE_ONLY', 'BUY_ONLY', 'BUY_ENQUIRE'],
      required: true 
    },
    whatsappEnabled: { type: Boolean, default: false },
    
    // Specifications
    material: { type: String },
    stone: { type: String },
    size: { type: String },
    weight: { type: String },
    origin: { type: String },
    certification: { type: String },
    
    // Images
    primaryImage: { type: String }, // Cloudinary URL
    gallery: [{ type: String }],
    altText: { type: String },
    
    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    ogImage: { type: String },
  },
  { timestamps: true }
);

ProductSchema.index({ status: 1, stockStatus: 1 });
ProductSchema.index({ category: 1 });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
