import { useState } from 'react';
import { Photo } from '@/data/models/Photo';

interface UploadProgress {
  percentage: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface UsePhotoUploadReturn {
  upload: (file: File, metadata?: PhotoMetadata) => Promise<Photo | null>;
  progress: UploadProgress;
  reset: () => void;
}

interface PhotoMetadata {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  alt?: string;
  projectId?: string;
}

export function usePhotoUpload(): UsePhotoUploadReturn {
  const [progress, setProgress] = useState<UploadProgress>({
    percentage: 0,
    status: 'idle',
  });

  const reset = () => {
    setProgress({
      percentage: 0,
      status: 'idle',
    });
  };

  const upload = async (file: File, metadata: PhotoMetadata = {}): Promise<Photo | null> => {
    try {
      console.log('Starting upload process with file:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`
      });
      
      setProgress({
        percentage: 0,
        status: 'uploading',
      });

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Add metadata
      if (metadata.title) formData.append('title', metadata.title);
      if (metadata.description) formData.append('description', metadata.description);
      if (metadata.category) formData.append('category', metadata.category);
      if (metadata.alt) formData.append('alt', metadata.alt);
      if (metadata.projectId) formData.append('projectId', metadata.projectId);
      
      // Handle tags
      if (metadata.tags && metadata.tags.length > 0) {
        formData.append('tags', metadata.tags.join(','));
      }
      
      console.log('Form data prepared with metadata:', { 
        title: metadata.title,
        category: metadata.category,
        tagsCount: metadata.tags?.length || 0
      });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          // Don't go beyond 90% - the final jump to 100% happens after server response
          if (prev.percentage < 90) {
            return {
              ...prev,
              percentage: Math.min(prev.percentage + 5, 90)
            };
          }
          return prev;
        });
      }, 300);

      try {
        console.log('Sending upload request to server...');
        
        // Send the request
        const response = await fetch('/api/photos/upload', {
          method: 'POST',
          body: formData,
        });
        
        // Clear the progress interval
        clearInterval(progressInterval);

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.error || `Server responded with status ${response.status}`;
          console.error('Server error during upload:', errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        console.log('Upload successful:', data);
        
        setProgress({
          percentage: 100,
          status: 'success',
        });

        return data.photo;
      } catch (error) {
        // Make sure to clear the interval if there was an error
        clearInterval(progressInterval);
        throw error;
      }
    } catch (error) {
      console.error('Upload error:', error);
      setProgress({
        percentage: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
      return null;
    }
  };

  return {
    upload,
    progress,
    reset,
  };
} 