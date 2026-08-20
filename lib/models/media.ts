import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    size: { type: Number },
    
    // SEO fields
    altText: { type: String },
    caption: { type: String },
    
    folder: { type: String, default: 'general' }
  },
  { timestamps: true }
);

export const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema);
