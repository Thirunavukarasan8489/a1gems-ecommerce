import mongoose from 'mongoose';

const MediaAssetSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    format: { type: String }, // e.g., 'jpg', 'png', 'mp4'
    resourceType: { type: String, default: 'image' }, // 'image', 'video', 'raw'
    bytes: { type: Number },
    width: { type: Number },
    height: { type: Number },
    altText: { type: String },
    folder: { type: String },
    uploadedBy: { type: String }, // Could store user ID or name
  },
  { timestamps: true }
);

export const MediaAsset = mongoose.models.MediaAsset || mongoose.model('MediaAsset', MediaAssetSchema);
