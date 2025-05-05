// Cloud storage configuration for image uploads
// This file sets up the configuration for AWS S3, Firebase Storage, or Cloudinary
// Choose one implementation based on your preference

// Upload size limits and allowed file types
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Define image dimensions limits
export const MAX_IMAGE_DIMENSIONS = {
  width: 4000,
  height: 4000,
};

// Thumbnail sizes
export const THUMBNAIL_SIZE = {
  width: 300,
  height: 300,
};

// Gallery image sizes
export const GALLERY_IMAGE_SIZE = {
  width: 1200,
  height: 900,
};

// This is a placeholder for the actual implementation
// You'll need to update this with real credentials and implementation details
export const storageConfig = {
  // Uncomment and configure the storage service you want to use
  
  // AWS S3 config
  // s3: {
  //   region: process.env.AWS_S3_REGION || '',
  //   bucketName: process.env.AWS_S3_BUCKET_NAME || '',
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  // },
  
  // Firebase Storage config
  // firebase: {
  //   apiKey: process.env.FIREBASE_API_KEY || '',
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  //   projectId: process.env.FIREBASE_PROJECT_ID || '',
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  // },
  
  // Cloudinary config
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || '',
  },
};

// Storage folder structure
export const STORAGE_FOLDERS = {
  projects: 'projects',
  gallery: 'gallery',
  testimonials: 'testimonials',
  uploads: 'uploads',
};

// Generate a unique filename for uploaded images
export const generateUniqueFilename = (originalFilename: string): string => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 10);
  const extension = originalFilename.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

// Define helper functions for file validation
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check if file type is allowed
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  return { valid: true };
}; 