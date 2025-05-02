'use client';

import React from 'react';
import { componentStyles } from '@/utils/design-system';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  as?: React.ElementType;
  id?: string;
  padded?: boolean;
  centered?: boolean;
}

/**
 * Container Component
 * A layout component for consistent content width and spacing
 */
const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className = '',
  as: Component = 'div',
  id,
  padded = true,
  centered = true,
}) => {
  // Get container classes from design system
  const containerClasses = componentStyles.container[size === 'full' ? 'default' : size];
  
  // Add padding if needed
  const paddingClasses = padded ? 'px-4 sm:px-6 md:px-8' : '';
  
  // Center the container if needed
  const centeringClasses = centered ? 'mx-auto' : '';
  
  // Override max-width for full width
  const maxWidthClass = size === 'full' ? 'max-w-none' : '';
  
  // Combine all classes
  const combinedClasses = `
    ${containerClasses}
    ${paddingClasses}
    ${centeringClasses}
    ${maxWidthClass}
    ${className}
  `.trim();

  return (
    <Component className={combinedClasses} id={id}>
      {children}
    </Component>
  );
};

export default Container; 