'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

/**
 * A reusable star rating component that displays a visual representation of ratings
 * Supports full, half, and empty stars with proper RTL support and accessibility
 */
const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className = '',
}) => {
  // Ensure rating is within bounds
  const normalizedRating = Math.min(Math.max(0, rating), maxRating);
  
  // Calculate how many full, half, and empty stars to display
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  // Determine star size based on prop
  const starSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  const starSize = starSizeMap[size];
  
  // Accessibility label
  const ariaLabel = `דירוג של ${normalizedRating} מתוך ${maxRating} כוכבים`;
  
  return (
    <div 
      className={`flex items-center gap-1 ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className={`${starSize} text-yellow-400 flex-shrink-0`}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      
      {/* Half star if needed */}
      {hasHalfStar && (
        <svg
          className={`${starSize} text-yellow-400 flex-shrink-0`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="halfStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStarGradient)"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      )}
      
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className={`${starSize} text-gray-300 flex-shrink-0`}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      
      {/* Optionally show numerical value */}
      {showValue && (
        <span className="text-sm font-medium text-gray-700 mr-1">
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating; 