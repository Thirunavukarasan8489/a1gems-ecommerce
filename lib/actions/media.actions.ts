'use server';

import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/db';
import { MediaAsset } from '@/lib/models/media';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to check auth
async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  
  const normRoles = allowedRoles.map(r => r.replace(' ', '_').toUpperCase());
  if (!normRoles.includes(session.role as string)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return session;
}

export async function checkCloudinaryConfig() {
  const isConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
  return { isConfigured };
}

export async function uploadMedia(formData: FormData) {
  try {
    const session = await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const file = formData.get('file') as File | null;
    if (!file) throw new Error('No file provided');

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'a1gems' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Save to DB
    const mediaDoc = await MediaAsset.create({
      publicId: uploadResult.public_id,
      url: uploadResult.url,
      secureUrl: uploadResult.secure_url,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      folder: 'a1gems',
      uploadedBy: session.name, // Tracking who uploaded
    });

    revalidatePath('/admin/media');
    return { success: true, data: JSON.parse(JSON.stringify(mediaDoc)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMediaAssets(page = 1, limit = 50) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();

    const skip = (page - 1) * limit;
    const assets = await MediaAsset.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await MediaAsset.countDocuments();

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(assets)),
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMediaAltText(id: string, altText: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const asset = await MediaAsset.findByIdAndUpdate(id, { altText }, { new: true }).lean();
    
    revalidatePath('/admin/media');
    return { success: true, data: JSON.parse(JSON.stringify(asset)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMediaAsset(id: string) {
  try {
    await checkAuth(['SUPER_ADMIN', 'CONTENT_MANAGER']);
    await dbConnect();
    
    const asset = await MediaAsset.findById(id);
    if (!asset) throw new Error('Asset not found');

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(asset.publicId);

    // Delete from DB
    await MediaAsset.findByIdAndDelete(id);
    
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
