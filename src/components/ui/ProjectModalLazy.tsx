// This file is a lazy-loaded version of the ProjectModal component
import { lazyLoad } from '@/utils/lazyLoad';
import React from 'react';

// The props type needs to be duplicated here for TypeScript
interface ProjectModalProps {
  project: {
    id: number;
    title: {
      he: string;
      en: string;
    };
    description: {
      he: string;
      en: string;
    };
    category: string;
    imageUrl: string;
    galleryImages?: string[];
    location?: string;
    completionDate?: string;
  };
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

// Create a placeholder for the modal that shows while it's loading
const ModalPlaceholder = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-8 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] animate-pulse">
      <div className="h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    </div>
  </div>
);

// Use the lazyLoad utility to dynamically import the ProjectModal component
const ProjectModalLazy = lazyLoad<React.ComponentType<ProjectModalProps>>(
  () => import('./ProjectModal'),
  {
    fallback: <ModalPlaceholder />,
  }
);

export default ProjectModalLazy; 