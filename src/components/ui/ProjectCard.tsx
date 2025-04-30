'use client';

import React from 'react';
import Image from 'next/image';
import { getProjectThumbnail } from '@/utils/imageUtils';

interface ProjectCardProps {
  id: number;
  title: {
    he: string;
    en: string;
  };
  category: string;
  imageUrl: string;
  onClick: () => void;
  dimensions?: {
    width: number;
    height: number;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  imageUrl,
  onClick,
  dimensions = { width: 4, height: 3 }
}) => {
  // Calculate aspect ratio for the card
  const aspectRatio = dimensions.width / dimensions.height;
  
  // Get appropriate fallback image if needed
  const optimizedImageUrl = getProjectThumbnail(imageUrl, category);
  
  // Define category labels
  const categoryLabels: { [key: string]: string } = {
    'residential': 'ריצוף ביתי',
    'bathroom': 'חדרי אמבטיה',
    'kitchen': 'מטבחים',
    'commercial': 'מסחרי',
    'default': 'פרויקט'
  };
  
  // Get category label with fallback
  const categoryLabel = categoryLabels[category] || categoryLabels.default;
  
  return (
    <div 
      className="group relative rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={onClick}
      style={{ aspectRatio: `${aspectRatio}`, height: 'auto' }}
    >
      {/* Project Image */}
      <div className="w-full h-full relative">
        <div style={{ paddingBottom: `${(dimensions.height / dimensions.width) * 100}%` }} className="relative">
          <Image
            src={optimizedImageUrl}
            alt={title.he}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={id <= 3} // Prioritize loading for first 3 items
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 right-0 p-4 w-full">
          <div className="text-white">
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded mb-2 shadow-sm">
              {categoryLabel}
            </span>
            <h3 className="text-lg sm:text-xl font-frank font-bold mb-1 drop-shadow-md transition-transform duration-300 group-hover:translate-y-[-5px]">
              {title.he}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 