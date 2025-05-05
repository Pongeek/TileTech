'use client';

import { useState } from 'react';
import PhotoUpload from '@/components/ui/PhotoUpload';
import PhotoGallery from '@/components/ui/PhotoGallery';
import { usePhotos } from '@/hooks/usePhotos';

export default function PhotosPage() {
  const { photos, loading, error, fetchPhotos, deletePhoto } = usePhotos();
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadComplete = (success: boolean) => {
    if (success) {
      // Force refresh the photos list from Cloudinary
      fetchPhotos(true);
      // Hide the upload form
      setShowUpload(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Photo Gallery</h1>
        <div className="flex gap-2">
          <button
            onClick={() => fetchPhotos(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Refresh Gallery
          </button>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {showUpload ? 'Cancel' : 'Upload Photo'}
          </button>
        </div>
      </div>

      {showUpload && (
        <div className="mb-8">
          <PhotoUpload onUploadComplete={handleUploadComplete} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <PhotoGallery photos={photos} onDelete={deletePhoto} />
      )}
    </div>
  );
} 