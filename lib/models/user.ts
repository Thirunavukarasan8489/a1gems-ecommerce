import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // BCrypt hash
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER'],
      default: 'LEAD_MANAGER',
    },
    screenPermissions: {
      type: [String],
      default: ['CATALOGUE', 'LEAD_MANAGEMENT'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
