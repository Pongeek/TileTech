// This file is a lazy-loaded version of the Contact component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// Create a placeholder for the Contact section while it's loading
const ContactPlaceholder = () => (
  <section className="py-16 bg-neutral">
    <div className="container-custom">
      <div className="text-center mb-10">
        <div className="h-10 w-40 bg-gray-300 rounded-lg mx-auto mb-4 animate-pulse"></div>
        <div className="h-5 w-3/4 max-w-xl bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="space-y-6">
          {/* Form fields placeholders */}
          {[1, 2, 3, 4].map((i) => (
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
  </section>
);

// Use the lazyLoad utility to dynamically import the Contact component
const ContactLazy = lazyLoad(
  () => import('./Contact'),
  {
    fallback: <ContactPlaceholder />,
  }
);

export default ContactLazy; 