'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeGesture, useIsTouchDevice } from '@/utils/mobile';
import { usePrefersReducedMotion } from '@/utils/animation';

interface SwipeableCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  slideClassName?: string;
  dotsClassName?: string;
  arrowsClassName?: string;
  onChange?: (index: number) => void;
}

/**
 * SwipeableCarousel Component
 * A mobile-optimized carousel with swipe gestures and accessibility features
 */
const SwipeableCarousel: React.FC<SwipeableCarouselProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
  slideClassName = '',
  dotsClassName = '',
  arrowsClassName = '',
  onChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = children.length;

  // Clear the autoplay timer on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (autoPlay && !prefersReducedMotion) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);

      return () => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, currentIndex, prefersReducedMotion]);

  // Navigate to previous slide
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? totalSlides - 1 : prevIndex - 1;
      if (onChange) onChange(newIndex);
      return newIndex;
    });
  };

  // Navigate to next slide
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % totalSlides;
      if (onChange) onChange(newIndex);
      return newIndex;
    });
  };

  // Navigate to a specific slide
  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    if (onChange) onChange(index);
  };

  // Process swipe gestures for mobile
  const { swipeHandlers } = useSwipeGesture({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    threshold: 50,
    preventDefaultTouchMove: true,
  });

  // Slide animation variants
  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (direction: number) => ({
          x: direction > 0 ? '100%' : '-100%',
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (direction: number) => ({
          x: direction > 0 ? '-100%' : '100%',
          opacity: 0,
        }),
      };

  // Swipe area props based on device
  const swipeProps = isTouch ? swipeHandlers : {};

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className="touch-none relative w-full h-full"
        {...swipeProps}
        aria-live="polite"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={`w-full h-full ${slideClassName}`}
            drag={isTouch ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -70) {
                handleNext();
              } else if (swipe > 70) {
                handlePrev();
              }
            }}
          >
            {children[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <div className={`absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 ${arrowsClassName}`}>
          <button
            className="bg-white bg-opacity-70 rounded-full p-2 text-primary hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handlePrev}
            aria-label="הקודם"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="bg-white bg-opacity-70 rounded-full p-2 text-primary hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handleNext}
            aria-label="הבא"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Dots Indicators */}
      {showDots && totalSlides > 1 && (
        <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-2 ${dotsClassName}`}>
          {children.map((_, index) => (
            <button
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary
                ${index === currentIndex ? 'bg-primary scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-100'}
              `}
              onClick={() => handleDotClick(index)}
              aria-label={`עבור לשקופית ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwipeableCarousel; 