'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  id: number;
  name: string;
  profileImage: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  featured: boolean;
  projectType?: string;
}

/**
 * Component for displaying an individual testimonial
 * Includes customer profile, rating, review text, and location
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  id,
  name,
  profileImage,
  location,
  rating,
  text,
  date,
  featured,
  projectType,
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format date to Hebrew locale
  const formattedDate = new Date(date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
  });
  
  // Determine if text needs "read more" option (over 150 chars)
  const isLongText = text.length > 150;
  const displayText = expanded || !isLongText ? text : `${text.substring(0, 150)}...`;
  
  // Project type labels
  const projectLabels: { [key: string]: string } = {
    'residential': 'ריצוף ביתי',
    'bathroom': 'חדרי אמבטיה',
    'kitchen': 'מטבחים',
    'commercial': 'מסחרי',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg p-6 h-full shadow-md transition-all duration-300 hover:shadow-lg ${
        featured ? 'bg-primary/5 border border-primary/20' : 'bg-white'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header with profile image, name, and rating */}
        <div className="flex items-start mb-4">
          <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden shrink-0">
            <Image
              src={profileImage}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
            <StarRating rating={rating} size="sm" />
          </div>
        </div>
        
        {/* Project type badge */}
        {projectType && (
          <div className="mb-3">
            <span className="inline-block bg-secondary/10 text-secondary text-xs px-2 py-1 rounded">
              {projectLabels[projectType] || projectType}
            </span>
          </div>
        )}
        
        {/* Review text */}
        <div className="flex-grow mb-4">
          <p className="text-gray-700 leading-relaxed">
            {displayText}
          </p>
          
          {/* Read more/less button for long texts */}
          {isLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-1 transition-colors focus:outline-none"
              aria-expanded={expanded}
            >
              {expanded ? 'הצג פחות' : 'קרא עוד'}
            </button>
          )}
        </div>
        
        {/* Footer with date */}
        <div className="text-sm text-gray-500 mt-auto">
          {formattedDate}
          
          {/* Featured badge */}
          {featured && (
            <span className="mr-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              ממולץ במיוחד
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 