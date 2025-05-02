// This file is a lazy-loaded version of the QuoteForm component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// Create a placeholder for the QuoteForm while it's loading
const QuoteFormPlaceholder = () => (
  <div className="max-w-2xl mx-auto w-full">
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
      
      <div className="space-y-6">
        {/* Form fields placeholders */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-100 rounded w-full"></div>
          </div>
        ))}
        
        {/* Button placeholder */}
        <div className="h-12 bg-primary bg-opacity-30 rounded-lg w-full mt-8"></div>
      </div>
    </div>
  </div>
);

// Use the lazyLoad utility to dynamically import the QuoteForm component
const QuoteFormLazy = lazyLoad(
  () => import('./QuoteForm'),
  {
    fallback: <QuoteFormPlaceholder />,
  }
);

export default QuoteFormLazy; 