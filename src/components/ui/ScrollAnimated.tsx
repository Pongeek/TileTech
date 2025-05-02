'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation, animationVariants } from '@/utils/animation';

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'fadeLeft' 
  | 'fadeRight' 
  | 'scale' 
  | 'stagger';

export interface ScrollAnimatedProps {
  children: ReactNode;
  type?: AnimationType;
  customVariants?: Variants;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

const ScrollAnimated: React.FC<ScrollAnimatedProps> = ({
  children,
  type = 'fadeUp',
  customVariants,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  className = '',
  as = 'div',
  id,
}) => {
  // Get the animation variants based on the type
  const getAnimationVariant = (): Variants => {
    // Use custom variants if provided
    if (customVariants) {
      return customVariants;
    }
    
    // Use predefined variants based on type
    switch (type) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration, delay } 
          }
        };
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
      case 'fadeDown':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
      case 'fadeLeft':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
      case 'fadeRight':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
      case 'stagger':
        return animationVariants.stagger;
      default:
        return animationVariants.fadeUp;
    }
  };
  
  // Reduced motion variants with minimal animation
  const reducedVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, delay }
    }
  };
  
  // Use our custom hook for scroll animations with accessibility
  const { ref, animate, initial, variants, isInView } = useScrollAnimation({
    threshold,
    once,
    animatedVariants: getAnimationVariant(),
    reducedVariants
  });

  // Use motion.div by default, but allow for custom elements
  const Component = motion[as as keyof typeof motion] || motion.div;
  
  return (
    <Component
      ref={ref}
      id={id}
      className={className}
      initial={initial}
      animate={animate}
      variants={variants}
      aria-hidden={!isInView}
    >
      {children}
    </Component>
  );
};

// Special stagger item component for use with stagger animation
export const StaggerItem: React.FC<Omit<ScrollAnimatedProps, 'type'>> = (props) => {
  const motionProps = {
    variants: animationVariants.staggerItem,
  };
  
  return (
    <motion.div {...motionProps} className={props.className}>
      {props.children}
    </motion.div>
  );
};

export default ScrollAnimated; 