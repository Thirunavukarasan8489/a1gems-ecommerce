import mongoose from 'mongoose';

const GuideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String },
    featuredImage: { type: String }, // Cloudinary URL
    readTimeMinutes: { type: Number, default: 5 },
    author: { type: String, default: 'A1 Gems Editorial Team' },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isActive: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Guide = mongoose.models.Guide || mongoose.model('Guide', GuideSchema);
