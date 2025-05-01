'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectImage } from '@/utils/imageUtils';

interface ProjectModalProps {
  project: {
    id: number;
    title: {
      he: string;
      en: string;
    };
    description: {
      he: string;
      en: string;
    };
    category: string;
    imageUrl: string;
    galleryImages?: string[];
    location?: string;
    completionDate?: string;
  };
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const mainImageUrl = getProjectImage(project.imageUrl, project.category);
  const [activeImage, setActiveImage] = useState<string>(mainImageUrl);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(-1); // -1 means main image is selected
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  
  // Reset active image and selected thumbnail when project changes
  useEffect(() => {
    setActiveImage(mainImageUrl);
    setSelectedThumbnailIndex(-1); // Reset to main image
  }, [project.id, mainImageUrl]);
  
  // Reset loading state when active image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [activeImage]);
  
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasNext) {
        onNext && onNext();
      } else if (event.key === 'ArrowRight' && hasPrev) {
        onPrev && onPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);
  
  // Close when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };
  
  // Handle thumbnail selection
  const handleThumbnailSelect = (index: number, imageUrl: string) => {
    setSelectedThumbnailIndex(index);
    setActiveImage(imageUrl);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-8 backdrop-blur-sm"
      onClick={handleClickOutside}
    >
      <motion.div 
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="bg-neutral-50 px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-2xl font-frank font-bold text-secondary">{project.title.he}</h2>
          <div className="flex items-center gap-2">
            {hasPrev && (
              <button 
                onClick={onPrev}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="הפרויקט הקודם"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            {hasNext && (
              <button 
                onClick={onNext}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="הפרויקט הבא"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="סגור"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Main image */}
          <div className="h-full flex flex-col">
            <div className="relative rounded-lg overflow-hidden shadow-md aspect-[4/3] w-full">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              <Image
                key={`project-${project.id}-${activeImage}`}
                src={activeImage}
                alt={project.title.he}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            </div>
            
            {/* Thumbnail gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                <button 
                  className={`relative w-full aspect-square rounded-md overflow-hidden transition-all duration-300 ${
                    selectedThumbnailIndex === -1 
                      ? 'ring-2 ring-primary border-2 border-primary shadow-md z-10' 
                      : 'border border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleThumbnailSelect(-1, mainImageUrl)}
                  aria-label="תמונה ראשית"
                  aria-pressed={selectedThumbnailIndex === -1}
                >
                  <Image
                    src={mainImageUrl}
                    alt="תמונה ראשית"
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="eager"
                  />
                </button>
                {project.galleryImages.slice(0, 4).map((img, index) => {
                  const galleryImgUrl = getProjectImage(img, project.category);
                  return (
                    <button 
                      key={index}
                      className={`relative w-full aspect-square rounded-md overflow-hidden transition-all duration-300 ${
                        selectedThumbnailIndex === index 
                          ? 'ring-2 ring-primary border-2 border-primary shadow-md z-10' 
                          : 'border border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => handleThumbnailSelect(index, galleryImgUrl)}
                      aria-label={`תמונה ${index + 1}`}
                      aria-pressed={selectedThumbnailIndex === index}
                    >
                      <Image
                        src={galleryImgUrl}
                        alt={`תמונה ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        loading="eager"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Project details */}
          <div className="h-full flex flex-col">
            <div className="bg-neutral-50 p-6 rounded-lg h-full">
              <div className="flex flex-col h-full">
                {/* Main content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category === 'residential' && 'ריצוף ביתי'}
                      {project.category === 'bathroom' && 'חדרי אמבטיה'}
                      {project.category === 'kitchen' && 'מטבחים'}
                      {project.category === 'commercial' && 'מסחרי'}
                    </div>
                    {project.location && (
                      <div className="text-gray-600 text-sm font-medium">
                        {project.location}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold font-heebo mb-4">{project.title.he}</h3>
                  
                  <p className="text-gray-700 mb-6 font-assistant leading-relaxed">
                    {project.description.he}
                  </p>
                </div>
                
                {/* Footer info */}
                {project.completionDate && (
                  <div className="border-t border-gray-200 pt-4 mt-auto">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>תאריך סיום: {formatDate(project.completionDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal; 