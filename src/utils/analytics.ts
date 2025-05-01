import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';

/**
 * Track key user interactions and conversions with custom events
 */
export const trackEvent = (
  eventName: string, 
  properties?: Record<string, string | number | boolean>
) => {
  // Use Vercel Analytics track function for custom events
  track(eventName, properties);
};

/**
 * Common event tracking functions for the TileTech website
 */
export const AnalyticsEvents = {
  // Form interactions
  formStart: (formName: string) => 
    trackEvent('form_start', { form: formName }),
  
  formStep: (formName: string, step: number) => 
    trackEvent('form_step', { form: formName, step }),
  
  formSubmit: (formName: string) => 
    trackEvent('form_submit', { form: formName }),
  
  formError: (formName: string, errorMessage: string) => 
    trackEvent('form_error', { form: formName, error: errorMessage }),
  
  // User interactions with services
  serviceView: (serviceId: number, serviceName: string) => 
    trackEvent('service_view', { serviceId, serviceName }),
  
  // Project interactions
  projectView: (projectId: number, projectName: string, category: string) => 
    trackEvent('project_view', { projectId, projectName, category }),
  
  // Site navigation
  pageView: (pagePath: string, pageTitle: string) => 
    trackEvent('page_view', { pagePath, pageTitle }),
  
  // Contact interactions
  contactClick: (source: string) => 
    trackEvent('contact_click', { source }),
  
  // Generic CTA clicks
  ctaClick: (ctaId: string, ctaText: string) => 
    trackEvent('cta_click', { ctaId, ctaText }),
};

/**
 * Analytics Provider Component
 * Add this to the root layout
 */
export function AnalyticsProvider() {
  return <Analytics />;
}

export default {
  trackEvent,
  AnalyticsEvents,
  AnalyticsProvider
}; 