'use client';

import React from 'react';
import { FeedbackProvider as InternalFeedbackProvider } from '@/utils/feedback';

/**
 * Feedback Provider Component
 * 
 * Provides toast notifications, loading states, and feedback mechanisms
 * to the entire application. Wrap your app with this component to enable
 * global feedback functionality.
 */
export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <InternalFeedbackProvider>
      {children}
    </InternalFeedbackProvider>
  );
};

export default FeedbackProvider; 