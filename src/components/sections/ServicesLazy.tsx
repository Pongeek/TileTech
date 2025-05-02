// This file is a lazy-loaded version of the Services component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// Create a placeholder for the Services section while it's loading
const ServicesPlaceholder = () => (
  <section className="py-16">
    <div className="container-custom">
      <div className="text-center mb-12">
        <div className="h-10 w-48 bg-gray-200 animate-pulse mx-auto rounded mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse mx-auto rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 animate-pulse mx-auto rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 mb-4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Use the lazyLoad utility to dynamically import the Services component
const ServicesLazy = lazyLoad(
  () => import('./Services'),
  {
    fallback: <ServicesPlaceholder />,
  }
);

export default ServicesLazy; 