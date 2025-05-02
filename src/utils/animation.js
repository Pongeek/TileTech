import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animation Utilities for TileTech
 * This file contains reusable animation hooks and configurations
 * for consistent animations throughout the application.
 */

/**
 * Check if the user prefers reduced motion
 * @returns {boolean} True if the user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes in motion preference
    const handleMotionPreferenceChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Get appropriate animation variants based on motion preferences
 * @param {Object} animatedVariants - The animated variants
 * @param {Object} reducedVariants - The reduced motion variants
 * @returns {Object} The appropriate variants based on motion preferences
 */
export const useAccessibleAnimationVariants = (animatedVariants, reducedVariants) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  return prefersReducedMotion ? reducedVariants : animatedVariants;
};

/**
 * Animate elements when they enter the viewport
 * @param {Object} options - Options for the hook
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {boolean} options.once - Whether to trigger only once
 * @param {Object} options.animatedVariants - Variants to use when animated
 * @param {Object} options.reducedVariants - Variants to use with reduced motion
 * @returns {Object} Animation properties and ref
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  once = true,
  animatedVariants,
  reducedVariants
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const variants = prefersReducedMotion ? reducedVariants : animatedVariants;
  
  return {
    ref,
    isInView,
    initial: variants.hidden,
    animate: isInView ? variants.visible : variants.hidden,
    variants
  };
};

/**
 * Common animation variants
 */
export const animationVariants = {
  // Fade in animation
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  // Fade up animation
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  // Fade down animation
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  // Fade left animation
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  // Fade right animation
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  // Scale animation
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  
  // Stagger children animation
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
  
  // Child item for stagger
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
  
  // Reduced motion variants (minimal animations for accessibility)
  reduced: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }
};

/**
 * Animation presets for common components
 */
export const animationPresets = {
  // Section animation with staggered children
  section: {
    container: animationVariants.stagger,
    item: animationVariants.staggerItem,
    reducedContainer: animationVariants.reduced,
    reducedItem: animationVariants.reduced
  },
  
  // Card animation on scroll
  card: {
    normal: animationVariants.fadeUp,
    reduced: animationVariants.reduced
  },
  
  // Header animation
  header: {
    normal: animationVariants.fadeDown,
    reduced: animationVariants.reduced
  },
  
  // Button animations
  button: {
    tap: { scale: 0.98 },
    hover: { scale: 1.05 },
    reducedTap: {},
    reducedHover: {}
  }
};

/**
 * Transition configurations
 */
export const transitions = {
  // Default transition 
  default: { duration: 0.3, ease: 'easeInOut' },
  
  // Spring transition
  spring: { 
    type: 'spring',
    stiffness: 300,
    damping: 20
  },
  
  // Slow transition
  slow: { duration: 0.6, ease: 'easeInOut' },
  
  // Fast transition
  fast: { duration: 0.2, ease: 'easeInOut' }
};

export default {
  usePrefersReducedMotion,
  useAccessibleAnimationVariants,
  useScrollAnimation,
  animationVariants,
  animationPresets,
  transitions
}; 