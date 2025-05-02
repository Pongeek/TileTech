/**
 * Mobile Utilities for TileTech
 * This file contains utilities for improving mobile experience and touch interactions
 */

import { useState, useEffect } from 'react';

/**
 * Detect if the current device is mobile
 * @returns {boolean} True if the device is mobile
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = 
        typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/**
 * Detect if the device supports touch events
 * @returns {boolean} True if touch is supported
 */
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    checkTouch();
  }, []);

  return isTouch;
};

/**
 * Hook to add touch feedback to elements
 * @param {number} duration - Duration of the effect in ms
 * @returns {Object} Touch handlers and CSS classes
 */
export const useTouchFeedback = (duration = 150) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
    }, duration);
  };

  return {
    isTouched,
    touchProps: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
    },
    touchClass: isTouched ? 'touch-active' : '',
  };
};

/**
 * Interface for swipe gesture options
 */
interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefaultTouchMove?: boolean;
}

/**
 * Hook for managing swipe gestures
 * @param {SwipeOptions} options - Configuration options
 * @returns {Object} Handlers for swipe gestures
 */
export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  preventDefaultTouchMove = false,
}: SwipeOptions = {}) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (preventDefaultTouchMove) {
      e.preventDefault();
    }

    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (distanceX > threshold && onSwipeLeft) {
        onSwipeLeft();
      } else if (distanceX < -threshold && onSwipeRight) {
        onSwipeRight();
      }
    } else {
      if (distanceY > threshold && onSwipeUp) {
        onSwipeUp();
      } else if (distanceY < -threshold && onSwipeDown) {
        onSwipeDown();
      }
    }
  };

  return {
    swipeHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};

/**
 * Add tap highlighting to elements to improve touch feedback on mobile
 * @param {string} color - CSS color for the tap highlight (default: 'rgba(0, 0, 0, 0.1)')
 * @returns {string} CSS style string
 */
export const getTapHighlightStyle = (color = 'rgba(0, 0, 0, 0.1)') => {
  return `-webkit-tap-highlight-color: ${color};`;
};

export default {
  useIsMobile,
  useIsTouchDevice,
  useTouchFeedback,
  useSwipeGesture,
  getTapHighlightStyle,
}; 