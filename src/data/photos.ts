// Photo data service
// This file provides functions for creating, reading, updating, and deleting photos

import fs from 'fs';
import path from 'path';
import { 
  Photo, 
  PhotoUploadMetadata, 
  PhotoCreateResponse, 
  PhotoUpdatePayload,
  PhotoGalleryOptions,
  PhotoGalleryResponse,
  generateMockPhotos
} from './models/Photo';

// File path for the photos JSON data
const PHOTOS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'photos.json');

// Initialize the photos file if it doesn't exist
const initializePhotosFile = () => {
  if (!fs.existsSync(PHOTOS_FILE_PATH)) {
    // For development, create with mock data
    // In production, start with an empty array
    const initialData = process.env.NODE_ENV === 'development' 
      ? generateMockPhotos(12) 
      : [];
    
    fs.writeFileSync(PHOTOS_FILE_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  
  try {
    const data = fs.readFileSync(PHOTOS_FILE_PATH, 'utf8');
    return JSON.parse(data) as Photo[];
  } catch (error) {
    console.error('Error reading photos data:', error);
    // If there's an error reading the file, create a new one with empty data
    fs.writeFileSync(PHOTOS_FILE_PATH, JSON.stringify([], null, 2));
    return [] as Photo[];
  }
};

// Get all photos with optional filtering and pagination
export const getPhotos = async (options: PhotoGalleryOptions = {}): Promise<PhotoGalleryResponse> => {
  let photos = await getAllPhotos();
  
  // Apply filters
  if (options.category) {
    photos = photos.filter(photo => photo.category === options.category);
  }
  
  if (options.tags && options.tags.length > 0) {
    photos = photos.filter(photo => 
      options.tags!.some(tag => photo.tags.includes(tag))
    );
  }
  
  // Apply sorting
  if (options.sortBy) {
    photos.sort((a, b) => {
      if (options.sortBy === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return options.sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        // Title sorting (ensuring string comparison)
        const titleA = String(a.title);
        const titleB = String(b.title);
        if (options.sortDirection === 'desc') {
          return titleB.localeCompare(titleA);
        }
        return titleA.localeCompare(titleB);
      }
    });
  } else {
    // Default sort by createdAt, newest first
    photos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  // Apply pagination
  const page = options.page || 1;
  const limit = options.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = photos.length;
  const totalPages = Math.ceil(total / limit);
  
  const paginatedPhotos = photos.slice(startIndex, endIndex);
  
  return {
    photos: paginatedPhotos,
    total,
    page,
    limit,
    totalPages
  };
};

// Get a single photo by ID
export const getPhotoById = async (id: string): Promise<Photo | null> => {
  const photos = await getAllPhotos();
  return photos.find(photo => photo.id === id) || null;
};

// Create a new photo record
export const createPhoto = async (metadata: PhotoUploadMetadata): Promise<PhotoCreateResponse> => {
  try {
    const photos = await getAllPhotos();
    
    // Generate a unique ID
    const id = `photo-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    const newPhoto: Photo = {
      id,
      title: metadata.title || metadata.fileName,
      description: metadata.description || '',
      url: '', // This should be set by the storage service
      thumbnailUrl: '', // This should be set by the storage service
      publicId: '', // This should be set by the storage service (e.g., Cloudinary)
      width: metadata.dimensions?.width || 0,
      height: metadata.dimensions?.height || 0,
      createdAt: new Date().toISOString(),
      category: metadata.category || 'general',
      tags: metadata.tags || [],
      alt: metadata.alt || metadata.fileName,
      projectId: metadata.projectId
    };
    
    photos.push(newPhoto);
    await savePhotos(photos);
    
    return {
      success: true,
      photo: newPhoto
    };
  } catch (error) {
    console.error('Error creating photo:', error);
    return {
      success: false,
      error: 'Failed to create photo record'
    };
  }
};

// Update photo metadata
export const updatePhoto = async (payload: PhotoUpdatePayload): Promise<PhotoCreateResponse> => {
  try {
    const photos = await getAllPhotos();
    const photoIndex = photos.findIndex(photo => photo.id === payload.id);
    
    if (photoIndex === -1) {
      return {
        success: false,
        error: 'Photo not found'
      };
    }
    
    // Update only the provided fields
    const updatedPhoto = {
      ...photos[photoIndex],
      ...(payload.title !== undefined && { title: payload.title }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.tags !== undefined && { tags: payload.tags }),
      ...(payload.category !== undefined && { category: payload.category }),
      ...(payload.alt !== undefined && { alt: payload.alt }),
      ...(payload.projectId !== undefined && { projectId: payload.projectId })
    };
    
    photos[photoIndex] = updatedPhoto;
    await savePhotos(photos);
    
    return {
      success: true,
      photo: updatedPhoto
    };
  } catch (error) {
    console.error('Error updating photo:', error);
    return {
      success: false,
      error: 'Failed to update photo record'
    };
  }
};

// Delete a photo by ID
export const deletePhoto = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const photos = await getAllPhotos();
    const photoIndex = photos.findIndex(photo => photo.id === id);
    
    if (photoIndex === -1) {
      return {
        success: false,
        error: 'Photo not found'
      };
    }
    
    // Remove the photo from the array
    photos.splice(photoIndex, 1);
    await savePhotos(photos);
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting photo:', error);
    return {
      success: false,
      error: 'Failed to delete photo record'
    };
  }
};

// Helper function to get all photos
const getAllPhotos = async (): Promise<Photo[]> => {
  try {
    if (!fs.existsSync(PHOTOS_FILE_PATH)) {
      return initializePhotosFile();
    }
    
    const data = await fs.promises.readFile(PHOTOS_FILE_PATH, 'utf8');
    return JSON.parse(data) as Photo[];
  } catch (error) {
    console.error('Error reading photos data:', error);
    return [];
  }
};

// Helper function to save photos to file
const savePhotos = async (photos: Photo[]): Promise<void> => {
  try {
    await fs.promises.writeFile(PHOTOS_FILE_PATH, JSON.stringify(photos, null, 2));
  } catch (error) {
    console.error('Error saving photos data:', error);
    throw error;
  }
};

// Initialize the photos file on module load
initializePhotosFile(); 