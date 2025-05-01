/**
 * Performance Optimization Utilities
 * 
 * This file contains utilities and best practices for optimizing website performance
 * based on Lighthouse audits and Web Vitals metrics.
 */

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to implement Intersection Observer for lazy loading components
 * Improves LCP (Largest Contentful Paint) by deferring non-critical content
 * 
 * @param options IntersectionObserver options
 * @returns [ref, isVisible] - ref to attach to element, boolean indicating if element is visible
 */
export function useIntersectionObserver(
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
}

/**
 * Helper function to generate image placeholders with proper encoding
 * Ensures proper handling of Hebrew characters in blur placeholders
 * 
 * @param width Width of the image
 * @param height Height of the image
 * @param text Optional text to show on placeholder (e.g., "טוען תמונה...")
 * @returns Base64 encoded SVG placeholder
 */
export function generatePlaceholder(width: number, height: number, text = 'טוען תמונה...'): string {
  const svg = `
    <svg width="${width}" height="${height}" 
         xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#f3f4f6" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" 
            font-size="14" text-anchor="middle" 
            dominant-baseline="middle" fill="#9ca3af">
        ${text}
      </text>
    </svg>
  `;
  
  // Use encodeURIComponent to handle Hebrew characters properly
  const encodedSvg = encodeURIComponent(svg.trim())
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'");
  
  return `data:image/svg+xml,${encodedSvg}`;
}

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

/**
 * Debounce function to limit the rate at which a function can fire
 * Useful for scroll, resize, or input events that might fire rapidly
 * 
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * Optimize Third-Party Script Loading
 * Adds async/defer attributes to third-party scripts
 * 
 * @param url Script URL
 * @param options Options for script loading
 * @returns Promise that resolves when script is loaded
 */
export function loadScript(
  url: string,
  options: {
    async?: boolean;
    defer?: boolean;
    id?: string;
    onLoad?: () => void;
  } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    
    if (options.id) script.id = options.id;
    if (options.async) script.async = true;
    if (options.defer) script.defer = true;
    
    script.onload = () => {
      if (options.onLoad) options.onLoad();
      resolve();
    };
    script.onerror = reject;
    
    document.head.appendChild(script);
  });
}

/**
 * Best practices for image optimization:
 * 1. Use Next.js Image component with proper sizes attribute
 * 2. Use WebP/AVIF formats when possible
 * 3. Include width and height attributes to prevent layout shifts
 * 4. Implement blur-up technique with placeholder
 * 5. Set loading="lazy" for images below the fold
 * 6. Use responsive images with srcSet
 */

/**
 * Best practices for font optimization:
 * 1. Use font-display: swap in CSS
 * 2. Preload critical fonts
 * 3. Use variable fonts when possible to reduce file size
 * 4. Consider using system fonts for non-essential text
 */

/**
 * Best practices for JavaScript optimization:
 * 1. Use dynamic imports for non-critical components
 * 2. Implement code splitting with React.lazy and Suspense
 * 3. Defer third-party scripts when possible
 * 4. Use event delegation for multiple similar event handlers
 * 5. Implement proper error boundaries
 */

/**
 * Core Web Vitals Optimization Checklist:
 * 
 * 1. LCP (Largest Contentful Paint) - Target < 2.5s
 *    - Optimize server response time
 *    - Eliminate render-blocking resources
 *    - Optimize critical rendering path
 *    - Preload important resources
 *    - Optimize images with proper sizing and formats
 * 
 * 2. FID (First Input Delay) - Target < 100ms
 *    - Break up long tasks
 *    - Optimize event handlers with debouncing/throttling
 *    - Use web workers for heavy computation
 *    - Reduce JavaScript execution time
 * 
 * 3. CLS (Cumulative Layout Shift) - Target < 0.1
 *    - Set explicit width/height for images and embeds
 *    - Avoid inserting content above existing content
 *    - Use transform animations instead of layout-triggering properties
 *    - Reserve space for dynamic content
 */

export default {
  useIntersectionObserver,
  generatePlaceholder,
  LazyLoad,
  debounce,
  loadScript
}; 