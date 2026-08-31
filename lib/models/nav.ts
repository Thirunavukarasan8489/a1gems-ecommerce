import mongoose from 'mongoose';

const NavItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
});

const NavSchema = new mongoose.Schema({
  primaryNav: [NavItemSchema],
  secondaryNav: [NavItemSchema],
  business: {
    phone: String,
    phoneHref: String,
    whatsapp: String,
    email: String,
    address: String,
    hours: String,
  }
}, { timestamps: true });

export const Nav = mongoose.models.Nav || mongoose.model('Nav', NavSchema);
