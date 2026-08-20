import { Media } from '../models/media';

/**
 * Service to abstract Cloudinary SDK interactions and sync with MongoDB.
 */
export class MediaService {
  /**
   * Mock upload function - returns a structured response matching Cloudinary.
   */
  static async uploadImage(base64Image: string, folder: string = 'general') {
    // TODO: Integrate actual cloudinary.v2.uploader.upload(base64Image, { folder })
    const mockCloudinaryRes = {
      public_id: `a1gems/${folder}/img_${Date.now()}`,
      secure_url: `https://res.cloudinary.com/demo/image/upload/v1234/a1gems/${folder}/img_${Date.now()}.jpg`,
      format: 'jpg',
      width: 800,
      height: 800,
      bytes: 102400
    };

    // Save metadata in MongoDB for fast retrieval
    const mediaRecord = await Media.create({
      publicId: mockCloudinaryRes.public_id,
      url: mockCloudinaryRes.secure_url,
      format: mockCloudinaryRes.format,
      width: mockCloudinaryRes.width,
      height: mockCloudinaryRes.height,
      size: mockCloudinaryRes.bytes,
      folder
    });

    return mediaRecord;
  }
}
