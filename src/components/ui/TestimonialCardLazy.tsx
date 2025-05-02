// This file is a lazy-loaded version of the TestimonialCard component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// Create a placeholder for the TestimonialCard while it's loading
const TestimonialCardPlaceholder = () => (
  <div className="bg-white rounded-lg shadow-md p-6 h-full animate-pulse">
    <div className="flex items-start mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
      <div className="flex flex-col">
        <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 mr-1 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

// Use the lazyLoad utility to dynamically import the TestimonialCard component
const TestimonialCardLazy = lazyLoad(
  () => import('./TestimonialCard'),
  {
    fallback: <TestimonialCardPlaceholder />,
  }
);

export default TestimonialCardLazy; 