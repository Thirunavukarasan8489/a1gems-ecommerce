import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  flatShippingFee: { type: Number, default: 20000 },
  freeShippingThreshold: { type: Number, default: 2500000 },
  currency: { type: String, default: 'INR' },
}, { timestamps: true });

export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
