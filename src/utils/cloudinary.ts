import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug environment variables
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? '***' : undefined, // Don't log the actual key, just check if it exists
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : undefined, // Don't log the actual secret
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
});

/**
 * Create a thumbnail URL from a main image URL using Cloudinary transformations
 * @param url The original image URL
 * @returns The thumbnail URL
 */
export function createThumbnailUrl(url: string): string {
  // Add Cloudinary transformations to create a thumbnail: 300x300, crop to fill
  return url.replace('/upload/', '/upload/w_300,h_300,c_fill/');
}

/**
 * Upload an image file to Cloudinary
 * @param filePath Path to the image file
 * @returns Cloudinary upload result
 */
export async function uploadImage(filePath: string) {
  try {
    console.log('Starting upload to Cloudinary:', { filePath });
    
    // Use the upload preset if available
    const uploadOptions: any = {
      folder: 'tiletech/photos', // Store in specific folder
      use_filename: true,
      unique_filename: true,
      transformation: [
        { width: 1200, crop: 'limit' }, // Resize for original
        { quality: 'auto' }, // Automatic quality
        { fetch_format: 'auto' }, // Automatic format
      ],
    };
    
    // Add upload preset if it exists
    if (process.env.CLOUDINARY_UPLOAD_PRESET) {
      uploadOptions.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    }
    
    // Upload the image
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    console.log('Cloudinary upload success:', { public_id: result.public_id });

    // Instead of creating a separate thumbnail, use transformations on the original URL
    const thumbnailUrl = createThumbnailUrl(result.secure_url);
    console.log('Thumbnail URL created using transformations');

    // Return both URLs and other metadata
    return {
      url: result.secure_url,
      thumbnailUrl: thumbnailUrl,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type,
      createdAt: result.created_at,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary: ' + (error instanceof Error ? error.message : String(error)));
  }
}

/**
 * Delete an image from Cloudinary by public ID
 * @param publicId Cloudinary public ID
 */
export async function deleteImage(publicId: string) {
  try {
    // Delete the main image (thumbnails are just transformations, so no need to delete separately)
    await cloudinary.uploader.destroy(publicId);
    console.log('Image deleted from Cloudinary:', publicId);
    
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
} 