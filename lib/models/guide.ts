import mongoose from 'mongoose';

const GuideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String },
    
    // MDX or HTML payload
    content: { type: String, required: true },
    
    // Cover Image
    coverImage: { type: String },
    
    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Guide = mongoose.models.Guide || mongoose.model('Guide', GuideSchema);
