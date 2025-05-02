// This file is a lazy-loaded version of the Testimonials component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// Create a placeholder for the Testimonials section while it's loading
const TestimonialsPlaceholder = () => (
  <section className="py-16 bg-gray-50">
    <div className="container-custom">
      <div className="text-center mb-12">
        <div className="h-10 w-56 bg-gray-200 animate-pulse mx-auto rounded mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse mx-auto rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 animate-pulse mx-auto rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse">
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
        ))}
      </div>
    </div>
  </section>
);

// Use the lazyLoad utility to dynamically import the Testimonials component
const TestimonialsLazy = lazyLoad(
  () => import('./Testimonials'),
  {
    fallback: <TestimonialsPlaceholder />,
  }
);

export default TestimonialsLazy; 