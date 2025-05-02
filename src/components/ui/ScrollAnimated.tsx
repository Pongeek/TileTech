'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/utils/animation';

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
  id?: string;
}

// Common animation variants
const defaultVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },
  
  reduced: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }
};

const ScrollAnimated: React.FC<ScrollAnimatedProps> = ({
  children,
  type = 'fadeUp',
  customVariants,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  className = '',
  id,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Get animation variants
  let variants: Variants;
  
  if (customVariants) {
    variants = customVariants;
  } else if (prefersReducedMotion) {
    variants = defaultVariants.reduced;
  } else {
    // Apply animations based on type
    switch (type) {
      case 'fadeIn':
        variants = {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration, delay } 
          }
        };
        break;
      case 'fadeUp':
        variants = {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
        break;
      case 'fadeDown':
        variants = {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
        break;
      case 'fadeLeft':
        variants = {
          hidden: { opacity: 0, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
        break;
      case 'fadeRight':
        variants = {
          hidden: { opacity: 0, x: 20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
        break;
      case 'scale':
        variants = {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration, delay, ease: 'easeOut' } 
          }
        };
        break;
      case 'stagger':
        variants = defaultVariants.stagger;
        break;
      default:
        variants = defaultVariants.fadeUp;
    }
  }
  
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      aria-hidden={!isInView}
    >
      {children}
    </motion.div>
  );
};

// Special stagger item component for use with stagger animation
export const StaggerItem: React.FC<Omit<ScrollAnimatedProps, 'type'>> = (props) => {
  return (
    <motion.div 
      variants={defaultVariants.staggerItem} 
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
};

export default ScrollAnimated; 