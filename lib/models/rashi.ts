import mongoose from 'mongoose';

const RashiSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  devanagari: { type: String, required: true },
  transliteration: { type: String, required: true },
  english: { type: String, required: true },
  symbol: { type: String, required: true },
  dateRange: { type: String, required: true },
  planet: { type: String, required: true },
  planetDevanagari: { type: String, required: true },
  stoneName: { type: String, required: true },
  categorySlug: { type: String, default: null },
}, { timestamps: true });

export const Rashi = mongoose.models.Rashi || mongoose.model('Rashi', RashiSchema);
