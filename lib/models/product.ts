import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    // Basic
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    shortDescription: { type: String },
    description: { type: String },
    
    // Pricing & Inventory (Removed Base pricing/stock as per requirements)
    
    // Variants
    hasVariants: { type: Boolean, default: true },
    variants: [{
      name: { type: String, required: true },
      caratApprox: { type: Number },
      size: { type: String },
      price: { type: Number, required: true },
      comparePrice: { type: Number },
      stock: { type: Number, required: true, default: 0 },
      lowStockThreshold: { type: Number, default: 5 },
    }],
    
    // Inventory
    reservedQuantity: { type: Number, required: true, default: 0 },
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
    primaryImage: { 
      url: { type: String },
      altText: { type: String }
    }, // Cloudinary URL + Alt Text
    gallery: [{ 
      url: { type: String },
      altText: { type: String }
    }],
    
    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    ogImage: { type: String },

    // Linked CMS Content
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' },
  },
  { timestamps: true }
);

ProductSchema.index({ status: 1, stockStatus: 1 });
ProductSchema.index({ category: 1 });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
