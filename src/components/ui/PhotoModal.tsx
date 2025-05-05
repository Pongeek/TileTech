'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/data/models/Photo';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
  onDelete?: (id: string) => Promise<boolean>;
}

export default function PhotoModal({ photo, onClose, onDelete }: PhotoModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Close when clicking the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Handle delete
  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      setIsDeleting(true);
      const success = await onDelete(photo.id);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{photo.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="flex flex-col md:flex-row max-h-[calc(90vh-9rem)]">
          {/* Image Container */}
          <div className="relative md:w-2/3 h-[300px] md:h-auto">
            <Image
              src={photo.url}
              alt={photo.alt || photo.title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-contain"
            />
          </div>
          
          {/* Details Container */}
          <div className="md:w-1/3 p-4 overflow-y-auto">
            {photo.description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{photo.description}</p>
              </div>
            )}
            
            {photo.category && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{photo.category}</p>
              </div>
            )}
            
            {photo.tags && photo.tags.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {photo.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Details</h3>
              <ul className="mt-1 text-sm text-gray-500">
                <li>
                  <span className="inline-block w-24">Dimensions:</span>
                  {photo.width} x {photo.height}
                </li>
                <li>
                  <span className="inline-block w-24">Uploaded:</span>
                  {new Date(photo.createdAt).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end items-center p-4 border-t">
          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete Photo'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 