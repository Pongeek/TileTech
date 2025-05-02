// This file is a lazy-loaded version of the ServiceCard component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// The props type needs to be duplicated here for TypeScript
interface ServiceCardProps {
  title: {
    he: string;
    en: string;
  };
  description: {
    he: string;
    en: string;
  };
  icon: React.ReactNode;
  imageUrl?: string;
}

// Create a placeholder for the ServiceCard while it's loading
const ServiceCardPlaceholder = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="p-6">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-neutral mb-4 mx-auto"></div>
      <div className="h-6 bg-neutral rounded w-3/4 mx-auto mb-3"></div>
      <div className="h-4 bg-neutral rounded w-full mb-2"></div>
      <div className="h-4 bg-neutral rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-neutral rounded w-4/6"></div>
    </div>
  </div>
);

// Use the lazyLoad utility to dynamically import the ServiceCard component
const ServiceCardLazy = lazyLoad(
  () => import('./ServiceCard'),
  {
    fallback: <ServiceCardPlaceholder />,
  }
);

export default ServiceCardLazy; 