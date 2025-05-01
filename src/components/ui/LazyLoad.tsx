import React from 'react';
import { useIntersectionObserver } from '@/utils/performanceOptimizations';

/**
 * Component to lazy load content using Intersection Observer
 * Use this to defer rendering of below-the-fold content
 */
export function LazyLoad({ 
  children, 
  placeholder = <div className="h-48 w-full bg-gray-100 animate-pulse"></div>,
  rootMargin = '100px',
}: { 
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  rootMargin?: string;
}) {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin,
    threshold: 0
  });

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder}
    </div>
  );
}

export default LazyLoad; 