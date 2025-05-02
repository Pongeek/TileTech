import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Feedback Utility
 * Provides toast notifications, loading states, and feedback mechanisms
 */

// Create a context for the feedback system
export const FeedbackContext = createContext({
  showToast: () => {},
  hideToast: () => {},
  setLoading: () => {},
  toast: null,
  isLoading: false,
});

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

/**
 * Feedback Provider Component
 * Wraps the application and provides feedback mechanisms
 */
export const FeedbackProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastTimeout, setToastTimeout] = useState(null);

  // Show a toast notification
  const showToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 3000) => {
    // Clear any existing timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    // Set the toast
    setToast({ message, type });

    // Auto-hide the toast after duration
    const timeout = setTimeout(() => {
      setToast(null);
    }, duration);

    setToastTimeout(timeout);

    // Cleanup timeout on unmount
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [toastTimeout]);

  // Hide the current toast
  const hideToast = useCallback(() => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    setToast(null);
  }, [toastTimeout]);

  // Context value
  const value = {
    toast,
    showToast,
    hideToast,
    isLoading,
    setLoading: setIsLoading,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      {isLoading && <LoadingOverlay />}
      {toast && <ToastNotification {...toast} onClose={hideToast} />}
    </FeedbackContext.Provider>
  );
};

/**
 * Hook to use the feedback system
 * @returns {Object} Feedback functions and state
 */
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

/**
 * Loading Overlay Component
 * Displays a full-screen loading overlay
 */
const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <div className="animate-spin mb-4 mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="text-lg font-medium">טוען...</p>
      </div>
    </div>
  );
};

/**
 * Toast Notification Component
 * Displays a toast notification message
 */
const ToastNotification = ({ message, type = TOAST_TYPES.INFO, onClose }) => {
  // Different styles based on toast type
  const getToastStyles = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-500 text-white';
      case TOAST_TYPES.ERROR:
        return 'bg-red-500 text-white';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-500 text-white';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-primary text-white';
    }
  };

  // Different icons based on toast type
  const getToastIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case TOAST_TYPES.ERROR:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case TOAST_TYPES.WARNING:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case TOAST_TYPES.INFO:
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full">
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${getToastStyles()} animate-fadeInUp`}>
        <div className="flex-shrink-0 ml-3">
          {getToastIcon()}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose} 
          className="flex-shrink-0 focus:outline-none hover:opacity-75 transition-opacity"
          aria-label="סגור התראה"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/**
 * Skeleton loading component for content
 */
export const Skeleton = ({ className = '', height = 'h-6', width = 'w-full', rounded = 'rounded', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className={`animate-pulse bg-gray-200 ${height} ${width} ${rounded} ${className} ${index > 0 ? 'mt-2' : ''}`}
        />
      ))}
    </>
  );
};

/**
 * Card Skeleton Component
 */
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default {
  FeedbackProvider,
  useFeedback,
  TOAST_TYPES,
  Skeleton,
  CardSkeleton,
}; 