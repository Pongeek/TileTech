import { useState, useEffect, useCallback } from 'react';
import { Photo } from '@/data/models/Photo';

interface UsePhotosReturn {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  fetchPhotos: (forceSync?: boolean) => Promise<void>;
  deletePhoto: (id: string) => Promise<boolean>;
}

export function usePhotos(initialCategory?: string): UsePhotosReturn {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | undefined>(initialCategory);

  const fetchPhotos = useCallback(async (forceSync = false) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL('/api/photos', window.location.origin);
      
      // Add category filter if provided
      if (category) {
        url.searchParams.append('category', category);
      }
      
      // Force a sync with Cloudinary if requested
      if (forceSync) {
        url.searchParams.append('force', 'true');
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.statusText}`);
      }

      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch photos');
    } finally {
      setLoading(false);
    }
  }, [category]);

  // Change category and fetch photos
  const changeCategory = useCallback((newCategory?: string) => {
    setCategory(newCategory);
    // fetchPhotos will be called by the useEffect below when category changes
  }, []);

  const deletePhoto = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete photo: ${response.statusText}`);
      }

      // Remove the deleted photo from state
      setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete photo');
      return false;
    }
  }, []);

  // Load photos when category changes or on initial render
  useEffect(() => {
    fetchPhotos(false);
  }, [fetchPhotos, category]);

  return {
    photos,
    loading,
    error,
    fetchPhotos,
    deletePhoto,
  };
} 