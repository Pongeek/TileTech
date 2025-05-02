'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTouchFeedback, useIsTouchDevice } from '@/utils/mobile';
import { usePrefersReducedMotion } from '@/utils/animation';

interface TouchableCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverEffect?: boolean;
  touchEffect?: boolean;
  ariaLabel?: string;
}

/**
 * TouchableCard Component
 * A card component optimized for touch interactions on mobile devices
 * with appropriate sized touch targets and feedback
 */
const TouchableCard: React.FC<TouchableCardProps> = ({
  children,
  onClick,
  className = '',
  hoverEffect = true,
  touchEffect = true,
  ariaLabel,
}) => {
  const { touchProps, touchClass } = useTouchFeedback();
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Check if the card is interactive (has onClick handler)
  const isInteractive = onClick !== undefined;

  // Base classes for card
  const baseClasses = `
    rounded-lg bg-white shadow-md overflow-hidden
    ${isInteractive ? 'cursor-pointer' : ''}
    ${touchClass}
  `;

  // Touch-specific styles
  const touchClasses = isTouch && touchEffect
    ? 'active:bg-primary-light/5 active:scale-[0.99] transition-transform duration-150'
    : '';

  // Hover effect styles (for non-touch devices)
  const hoverClasses = !isTouch && hoverEffect && !prefersReducedMotion
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
    : '';

  // Accessibility-focused styles
  const a11yClasses = isInteractive
    ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
    : '';

  // Combined classes
  const cardClasses = `
    ${baseClasses}
    ${touchClasses}
    ${hoverClasses}
    ${a11yClasses}
    ${className}
  `.trim();

  // Use motion.div for animations if not preferring reduced motion
  if (!prefersReducedMotion && isInteractive) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={hoverEffect && !isTouch ? { y: -4, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" } : {}}
        whileTap={touchEffect ? { scale: 0.98 } : {}}
        {...(isTouch ? touchProps : {})}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </motion.div>
    );
  }

  // Regular div with CSS transitions for reduced motion or non-interactive cards
  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...(isTouch && touchEffect ? touchProps : {})}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default TouchableCard; 