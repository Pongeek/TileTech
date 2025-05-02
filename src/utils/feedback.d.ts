// Type definitions for feedback module
import React from 'react';

declare module '@/utils/feedback' {
  export const TOAST_TYPES: {
    SUCCESS: 'success';
    ERROR: 'error';
    INFO: 'info';
    WARNING: 'warning';
  };

  export interface FeedbackContextType {
    toast: { message: string; type: string } | null;
    showToast: (message: string, type?: string, duration?: number) => void;
    hideToast: () => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
  }

  export const FeedbackContext: React.Context<FeedbackContextType>;
  
  export const useFeedback: () => FeedbackContextType;
  
  export const FeedbackProvider: React.FC<{ children: React.ReactNode }>;
  
  export const Skeleton: React.FC<{
    className?: string;
    height?: string;
    width?: string;
    rounded?: string;
    count?: number;
  }>;
  
  export const CardSkeleton: React.FC<{
    count?: number;
  }>;
} 