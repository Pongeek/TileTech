// Types and interfaces for the photo system

// Base photo interface
export interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  publicId: string; // Cloudinary public ID for deletion
  width: number;
  height: number;
  createdAt: string;
  category: string;
  tags: string[];
  projectId?: string; // Optional reference to a project
  alt?: string; // Optional alt text for accessibility
}

// Photo metadata for upload
export interface PhotoUploadMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  dimensions: {
    width: number;
    height: number;
  };
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  alt?: string;
  projectId?: string;
}

// Photo create response
export interface PhotoCreateResponse {
  success: boolean;
  photo?: Photo;
  error?: string;
}

// Photo update payload
export interface PhotoUpdatePayload {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  alt?: string;
  projectId?: string;
}

// Photo gallery options
export interface PhotoGalleryOptions {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string[];
  sortBy?: 'createdAt' | 'title';
  sortDirection?: 'asc' | 'desc';
}

// Photo gallery response
export interface PhotoGalleryResponse {
  photos: Photo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Mock data function for development
export const generateMockPhotos = (count: number = 3): Photo[] => {
  // Sample bathroom, kitchen, living room images
  const placeholderImages = [
    {
      url: 'https://placehold.co/800x600/eef/png?text=Bathroom+Design',
      thumbnail: 'https://placehold.co/300x300/eef/png?text=Bathroom',
      title: 'Bathroom Design',
      description: 'Modern bathroom design with clean lines and neutral colors',
      category: 'gallery',
      tags: ['bathroom', 'modern', 'design']
    },
    {
      url: 'https://placehold.co/800x600/efe/png?text=Kitchen+Remodel',
      thumbnail: 'https://placehold.co/300x300/efe/png?text=Kitchen',
      title: 'Kitchen Remodel',
      description: 'Complete kitchen remodel with custom cabinetry and island',
      category: 'project',
      tags: ['kitchen', 'remodel', 'modern']
    },
    {
      url: 'https://placehold.co/800x600/fee/png?text=Living+Room+Tile',
      thumbnail: 'https://placehold.co/300x300/fee/png?text=Living+Room',
      title: 'Living Room Flooring',
      description: 'Luxury vinyl tile installation in open concept living space',
      category: 'gallery',
      tags: ['living room', 'flooring', 'vinyl']
    },
  ];
  
  // Ensure we don't try to generate more than we have templates for
  const photosToGenerate = Math.min(count, placeholderImages.length);
  
  return Array.from({ length: photosToGenerate }, (_, i) => {
    const template = placeholderImages[i];
    
    return {
      id: `photo-${i + 1}`,
      title: template.title,
      description: template.description,
      url: template.url,
      thumbnailUrl: template.thumbnail,
      publicId: `mock-public-id-${i + 1}`,
      width: 800,
      height: 600,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      category: template.category,
      tags: template.tags,
      alt: template.title,
    };
  });
}; 