'use client';

import { useState } from 'react';
import { Photo } from '@/data/models/Photo';
import Image from 'next/image';
import PhotoModal from './PhotoModal';

interface PhotoGalleryProps {
  photos: Photo[];
  onDelete?: (id: string) => Promise<boolean>;
}

export default function PhotoGallery({ photos, onDelete }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="w-full">
      {/* Photo Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail Image */}
              <div 
                className="cursor-pointer h-48 relative" 
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.alt || photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              
              {/* Photo Info */}
              <div className="p-3">
                <h3 className="text-lg font-medium truncate">{photo.title}</h3>
                {photo.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                )}
                
                {/* Tags */}
                {photo.tags && photo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {photo.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {photo.tags.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs text-gray-500">
                        +{photo.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No photos to display</p>
        </div>
      )}
      
      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
} 