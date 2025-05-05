import { NextRequest, NextResponse } from 'next/server';
import { Photo, generateMockPhotos } from '@/data/models/Photo';
import { v2 as cloudinary } from 'cloudinary';
import { createThumbnailUrl } from '@/utils/cloudinary';

// In-memory store for photos (in a real app, this would be a database)
// This will reset when the server restarts, but it's fine for development
let photosStore: Photo[] = [];
let isInitialized = false;
let lastCloudinarySyncTime = 0; // Track when we last synced with Cloudinary

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dyxjbqvwz',
  api_key: process.env.CLOUDINARY_API_KEY || '561161481114472',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Cloudinary images
async function initializePhotos() {
  if (isInitialized) return;
  
  console.log('Initializing photos...');
  try {
    // First add mock photos to ensure there's always content
    const mockPhotos = generateMockPhotos(3);
    photosStore = [...mockPhotos]; // Start with fresh mock photos
    console.log(`Added ${mockPhotos.length} mock photos to the store. Total: ${photosStore.length}`);
    
    // Add all our known Cloudinary photos directly - using main URLs for thumbnails with transformations
    const knownPhotos = [
      {
        id: 'cloudinary-kitchen_after',
        title: 'Kitchen After',
        description: 'Kitchen After installation',
        url: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/v1746392736/tiletech/photos/kitchen_after_rt3y7z.jpg',
        publicId: 'tiletech/photos/kitchen_after_rt3y7z',
        width: 1200,
        height: 800,
        createdAt: new Date().toISOString(),
        category: 'service',
        tags: ['kitchen'],
      },
      {
        id: 'cloudinary-kitchen_before',
        title: 'Kitchen Before',
        description: 'Kitchen before renovation',
        url: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/v1746393042/tiletech/photos/kitchen_before_zuytxr.jpg',
        publicId: 'tiletech/photos/kitchen_before_zuytxr',
        width: 1200,
        height: 800,
        createdAt: new Date().toISOString(),
        category: 'service',
        tags: ['kitchen', 'before'],
      },
      {
        id: 'cloudinary-living_room_before',
        title: 'Living Room Before',
        description: 'Living room before renovation',
        url: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/v1746393211/tiletech/photos/living_room_before_elcu7y.jpg',
        publicId: 'tiletech/photos/living_room_before_elcu7y',
        width: 1200,
        height: 800,
        createdAt: new Date().toISOString(),
        category: 'service',
        tags: ['living room', 'before'],
      },
      {
        id: 'cloudinary-living_room_after',
        title: 'Living Room After',
        description: 'Living room after renovation',
        url: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/v1746393143/tiletech/photos/living_room_after_2_oqzujj.jpg',
        publicId: 'tiletech/photos/living_room_after_2_oqzujj',
        width: 1200,
        height: 800,
        createdAt: new Date().toISOString(),
        category: 'service',
        tags: ['living room', 'after'],
      }
    ];
    
    // Add all known photos with generated thumbnails
    for (const photo of knownPhotos) {
      // Create the photo object with a thumbnail URL derived from the main URL
      const photoWithThumbnail: Photo = {
        ...photo,
        thumbnailUrl: createThumbnailUrl(photo.url),
      };
      photosStore.push(photoWithThumbnail);
    }
    console.log(`Added ${knownPhotos.length} known Cloudinary photos. Total: ${photosStore.length}`);
    
    // Update all photos from Cloudinary
    await syncPhotosFromCloudinary();
    
    // Mark initialization as complete
    isInitialized = true;
    console.log(`Photo initialization complete. Total photos: ${photosStore.length}`);
  } catch (error) {
    console.error('Error initializing photos:', error);
  }
}

// Sync photos from Cloudinary to make sure we have all the latest uploads
async function syncPhotosFromCloudinary() {
  try {
    if (!process.env.CLOUDINARY_API_SECRET) {
      console.log('Cloudinary API secret not configured, skipping sync');
      return;
    }
    
    // Set of public IDs we already have in the store
    const existingPublicIds = new Set(photosStore.map(photo => photo.publicId));
    
    // Add the known hardcoded IDs to the set so we don't create duplicates
    const knownPublicIds = [
      'tiletech/photos/kitchen_after_rt3y7z',
      'tiletech/photos/kitchen_before_zuytxr',
      'tiletech/photos/living_room_before_elcu7y',
      'tiletech/photos/living_room_after_2_oqzujj'
    ];
    
    knownPublicIds.forEach(id => existingPublicIds.add(id));
    
    // Fetch resources from Cloudinary
    const { resources } = await cloudinary.search
      .expression('folder:tiletech/photos')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
    
    if (resources && resources.length > 0) {
      let newPhotosAdded = 0;
      
      // Add each real photo to the store if not already added
      for (const resource of resources) {
        // Skip thumbnails and already added photos
        if (resource.public_id.includes('thumbnails') || existingPublicIds.has(resource.public_id)) {
          continue;
        }
        
        // Create and add a new photo
        const cloudinaryPhoto: Photo = {
          id: `cloudinary-${resource.public_id.split('/').pop()}`,
          title: resource.filename || 'Untitled',
          description: 'Uploaded to Cloudinary',
          url: resource.secure_url,
          thumbnailUrl: createThumbnailUrl(resource.secure_url),
          publicId: resource.public_id,
          width: resource.width,
          height: resource.height,
          createdAt: resource.created_at || new Date().toISOString(),
          category: 'cloudinary',
          tags: resource.tags || [],
        };
        
        // Add to store and track that we've processed this ID
        photosStore.push(cloudinaryPhoto);
        existingPublicIds.add(resource.public_id);
        newPhotosAdded++;
      }
      
      if (newPhotosAdded > 0) {
        console.log(`Added ${newPhotosAdded} additional Cloudinary photos. Total: ${photosStore.length}`);
      }
    }
    
    // Update the last sync time
    lastCloudinarySyncTime = Date.now();
    
  } catch (error) {
    console.error('Error syncing photos from Cloudinary:', error);
  }
}

// Add a photo to the store
export function addPhotoToStore(photo: Photo) {
  photosStore.push(photo);
  console.log(`Photo added to store. Total photos: ${photosStore.length}`);
}

// GET /api/photos
export async function GET(req: NextRequest) {
  try {
    // Initialize photos if not already done
    if (!isInitialized) {
      await initializePhotos();
    }
    
    // Check if we should sync with Cloudinary
    // Either if it's been more than 30 seconds since last sync or if the URL has a force=true param
    const { searchParams } = new URL(req.url);
    const forceSync = searchParams.get('force') === 'true';
    const shouldSync = forceSync || (Date.now() - lastCloudinarySyncTime > 30000);
    
    if (shouldSync) {
      console.log('Syncing photos from Cloudinary...');
      await syncPhotosFromCloudinary();
    }
    
    // Get category filter if provided
    const category = searchParams.get('category');
    
    // Apply category filter if provided
    let photos = photosStore;
    if (category) {
      photos = photos.filter(photo => photo.category === category);
    }
    
    // Return photos sorted by creation date (newest first)
    return NextResponse.json({
      photos: photos.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      total: photos.length,
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Start initialization on server load
initializePhotos(); 