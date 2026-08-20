import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    // Basic
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    shortDescription: { type: String },
    description: { type: String },
    
    // Pricing
    sellingPrice: { type: Number, required: true },
    comparePrice: { type: Number },
    
    // Inventory
    sku: { type: String, required: true, unique: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    reservedQuantity: { type: Number, required: true, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    stockStatus: { type: String, enum: ['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'] },
    
    // Purchase Config
    purchaseType: { 
      type: String, 
      enum: ['ENQUIRY_ONLY', 'BUY_ONLY', 'BUY_AND_ENQUIRE'],
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
    primaryImage: { type: String, required: true }, // Cloudinary URL
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

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
