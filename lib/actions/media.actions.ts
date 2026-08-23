'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

import dbConnect from '@/lib/db';
import { MediaAsset } from '@/lib/models/media';
import { getSession } from '@/lib/auth';

const CLOUDINARY_FOLDER = 'a1gems';
const MEDIA_PATH = '/admin/media';

/**
 * Configure Cloudinary
 */
function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary configuration is missing. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.'
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return cloudinary;
}

/**
 * Authentication helper
 */
async function checkAuth(allowedRoles: string[]) {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const sessionRole = String(session.role || '')
    .replace(/\s+/g, '_')
    .toUpperCase();

  const normalizedRoles = allowedRoles.map((role) =>
    role.replace(/\s+/g, '_').toUpperCase()
  );

  if (!normalizedRoles.includes(sessionRole)) {
    throw new Error('Forbidden: Insufficient permissions');
  }

  return session;
}

/**
 * Normalize Cloudinary errors
 */
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const cloudinaryError = error as {
      message?: string;
      http_code?: number;
      name?: string;
    };

    if (cloudinaryError.http_code) {
      return `Cloudinary error ${cloudinaryError.http_code}: ${cloudinaryError.message || 'Unknown Cloudinary error'
        }`;
    }

    if (cloudinaryError.message) {
      return cloudinaryError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Check Cloudinary configuration
 */
export async function checkCloudinaryConfig() {
  const isConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    isConfigured,
  };
}

/**
 * Upload media
 */
export async function uploadMedia(formData: FormData) {
  try {
    const session = await checkAuth([
      'SUPER_ADMIN',
      'CONTENT_MANAGER',
    ]);

    await dbConnect();

    const file = formData.get('file');

    if (!(file instanceof File)) {
      throw new Error('No valid file provided');
    }

    if (file.size <= 0) {
      throw new Error('File is empty');
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const cloudinaryClient = configureCloudinary();

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinaryClient.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            console.error('CLOUDINARY UPLOAD ERROR:', {
              message: error.message,
              http_code: error.http_code,
              name: error.name,
            });

            reject(error);
            return;
          }

          if (!result) {
            reject(
              new Error('Cloudinary returned an empty upload response')
            );
            return;
          }

          resolve(result);
        }
      );

      uploadStream.on('error', (error) => {
        console.error('CLOUDINARY STREAM ERROR:', error);
        reject(error);
      });

      uploadStream.end(buffer);
    });

    /**
     * Save uploaded media in database
     */
    const mediaDoc = await MediaAsset.create({
      publicId: uploadResult.public_id,
      url: uploadResult.url,
      secureUrl: uploadResult.secure_url,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      folder: CLOUDINARY_FOLDER,
      uploadedBy: session.name,
    });

    revalidatePath(MEDIA_PATH);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(mediaDoc)),
    };
  } catch (error) {
    console.error('uploadMedia ERROR:', error);

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Get media assets
 */
export async function getMediaAssets(
  page = 1,
  limit = 50
) {
  try {
    await checkAuth([
      'SUPER_ADMIN',
      'CONTENT_MANAGER',
    ]);

    await dbConnect();

    const currentPage = Math.max(1, page);
    const currentLimit = Math.min(Math.max(1, limit), 100);

    const skip = (currentPage - 1) * currentLimit;

    const [assets, total] = await Promise.all([
      MediaAsset.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(currentLimit)
        .lean(),

      MediaAsset.countDocuments(),
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(assets)),
      pagination: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages: Math.ceil(total / currentLimit),
      },
    };
  } catch (error) {
    console.error('getMediaAssets ERROR:', error);

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Update media alt text
 */
export async function updateMediaAltText(
  id: string,
  altText: string
) {
  try {
    await checkAuth([
      'SUPER_ADMIN',
      'CONTENT_MANAGER',
    ]);

    await dbConnect();

    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid media asset ID');
    }

    const asset = await MediaAsset.findByIdAndUpdate(
      id,
      {
        altText: altText.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!asset) {
      throw new Error('Media asset not found');
    }

    revalidatePath(MEDIA_PATH);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(asset)),
    };
  } catch (error) {
    console.error('updateMediaAltText ERROR:', error);

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Delete media from Cloudinary
 */
async function deleteFromCloudinary(
  publicId: string,
  resourceType?: string
) {
  const cloudinaryClient = configureCloudinary();

  let type: 'image' | 'video' | 'raw' = 'image';

  if (resourceType === 'video') {
    type = 'video';
  } else if (resourceType === 'raw') {
    type = 'raw';
  }

  return cloudinaryClient.uploader.destroy(publicId, {
    resource_type: type,
  });
}

/**
 * Delete media asset
 */
export async function deleteMediaAsset(id: string) {
  try {
    await checkAuth([
      'SUPER_ADMIN',
      'CONTENT_MANAGER',
    ]);

    await dbConnect();

    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid media asset ID');
    }

    const asset = await MediaAsset.findById(id);

    if (!asset) {
      throw new Error('Asset not found');
    }

    /**
     * Delete from Cloudinary first
     */
    await deleteFromCloudinary(
      asset.publicId,
      asset.resourceType
    );

    /**
     * Delete from database
     */
    await MediaAsset.findByIdAndDelete(id);

    revalidatePath(MEDIA_PATH);

    return {
      success: true,
    };
  } catch (error) {
    console.error('deleteMediaAsset ERROR:', error);

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Delete media by URL
 *
 * Used for cleaning orphaned media.
 */
export async function deleteMediaByUrl(url: string) {
  if (!url || url.includes('placehold.co')) {
    return {
      success: true,
      skipped: true,
    };
  }

  try {
    await dbConnect();

    const asset = await MediaAsset.findOne({
      $or: [
        { url },
        { secureUrl: url },
      ],
    });

    if (!asset) {
      return {
        success: true,
        skipped: true,
      };
    }

    /**
     * Check Product references
     */
    const Product = mongoose.models.Product;

    if (Product) {
      const inUse = await Product.exists({
        $or: [
          { 'primaryImage.url': url },
          { 'gallery.url': url },
        ],
      });

      if (inUse) {
        return {
          success: true,
          skipped: true,
          reason: 'Media is still being used by a product',
        };
      }
    }

    /**
     * Delete from Cloudinary
     */
    await deleteFromCloudinary(
      asset.publicId,
      asset.resourceType
    );

    /**
     * Delete from database
     */
    await MediaAsset.findByIdAndDelete(asset._id);

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      `Failed to clean up orphaned media: ${url}`,
      error
    );

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}