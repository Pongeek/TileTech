'use client';

import React, { useState } from 'react';
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

const projectLabels: { [key: string]: string } = {
  'residential': 'ריצוף ביתי',
  'bathroom': 'חדרי אמבטיה',
  'kitchen': 'מטבחים',
  'commercial': 'מסחרי',
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  rating,
  text,
  date,
  featured,
  projectType,
}) => {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
  });

  const isLongText = text.length > 150;
  const displayText = expanded || !isLongText ? text : `${text.substring(0, 150)}...`;

  // Avatar: first letter of name
  const initial = name ? name.charAt(0) : '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-lg p-6 h-full flex flex-col border border-gray-200 bg-white shadow-md transition-all duration-300 motion-reduce:transition-none hover:shadow-lg motion-reduce:hover:transform-none ${
        featured ? 'ring-2 ring-primary/40 shadow-lg' : 'hover:-translate-y-1'
      }`}
    >
      {/* Large decorative quote mark */}
      <span className="absolute top-4 left-5 text-6xl font-serif text-primary/15 leading-none select-none" aria-hidden="true">
        ❝
      </span>

      {/* Review text */}
      <p className="text-gray-600 font-assistant text-sm leading-relaxed mb-4 relative z-10 pt-4">
        {displayText}
      </p>

      {isLongText && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary hover:text-primary-dark text-xs font-medium mb-4 transition-colors focus:outline-none self-start"
          aria-expanded={expanded}
        >
          {expanded ? 'הצג פחות' : 'קרא עוד'}
        </button>
      )}

      {/* Spacer */}
      <div className="mt-auto">
        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mb-4" />

        {/* Footer: avatar + name + rating */}
        <div className="flex items-center gap-3">
          {/* Avatar circle with initial */}
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="font-frank font-bold text-primary text-base">{initial}</span>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-frank font-bold text-secondary text-sm truncate">{name}</span>
            <div className="flex items-center gap-1.5">
              {location && (
                <span className="text-gray-400 text-xs truncate">{location}</span>
              )}
              {projectType && (
                <>
                  <span className="text-gray-300 text-xs">·</span>
                  <span className="text-xs text-primary/80 font-assistant">
                    {projectLabels[projectType] || projectType}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="ms-auto shrink-0">
            <StarRating rating={rating} size="sm" />
          </div>
        </div>

        {/* Date + featured badge */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400 font-assistant">{formattedDate}</span>
          {featured && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-assistant">
              ממולץ במיוחד
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
