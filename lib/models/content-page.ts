import mongoose from 'mongoose';

const ContentPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String }, // Raw HTML or markdown
    seoTitle: { type: String },
    seoDescription: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ContentPage = mongoose.models.ContentPage || mongoose.model('ContentPage', ContentPageSchema);
