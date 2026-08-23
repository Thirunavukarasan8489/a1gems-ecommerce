import mongoose from 'mongoose';

const HomepageSectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['HERO_BANNER', 'PROMOTIONAL_BANNER', 'FEATURED_CATEGORY', 'TRUST_HIGHLIGHTS', 'CUSTOM'],
      required: true,
    },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    mediaUrl: { type: String },
    mobileMediaUrl: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    // Optional reference if a section ties directly to a category
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

export const HomepageSection = mongoose.models.HomepageSection || mongoose.model('HomepageSection', HomepageSectionSchema);
