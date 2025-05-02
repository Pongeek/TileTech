// This file is a lazy-loaded version of the BeforeAfterSlider component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// Create a placeholder for the BeforeAfterSlider while it's loading
const BeforeAfterSliderPlaceholder = () => (
  <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-gray-400">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
        </svg>
        <div className="mt-2 text-center">טוען השוואת תמונות...</div>
      </div>
    </div>
  </div>
);

// Use the lazyLoad utility to dynamically import the BeforeAfterSlider component
const BeforeAfterSliderLazy = lazyLoad(
  () => import('./BeforeAfterSlider'),
  {
    fallback: <BeforeAfterSliderPlaceholder />,
  }
);

export default BeforeAfterSliderLazy; 