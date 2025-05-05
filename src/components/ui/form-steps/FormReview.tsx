'use client';

import React, { useState } from 'react';
import { useFormContext, FormStep } from '@/hooks/useFormContext';
import { 
  projectTypes, 
  timelineOptions, 
  budgetRanges, 
  referralOptions 
} from '@/utils/validationSchemas';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsEvents } from '@/utils/analytics';

const FormReview: React.FC = () => {
  const { 
    prevStep, 
    formData, 
    isSubmitting, 
    setIsSubmitting,
    setFormError,
    setCurrentStep,
    setIsSubmitted
  } = useFormContext();
  
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // Get label by ID for option fields
  const getProjectTypeLabel = (id: string) => {
    const projectType = projectTypes.find(type => type.id === id);
    return projectType ? projectType.label : id;
  };
  
  const getTimelineLabel = (id: string) => {
    const timeline = timelineOptions.find(option => option.id === id);
    return timeline ? timeline.label : id;
  };
  
  const getBudgetLabel = (id: string) => {
    const budget = budgetRanges.find(range => range.id === id);
    return budget ? budget.label : id;
  };
  
  const getReferralLabel = (id: string) => {
    const referral = referralOptions.find(option => option.id === id);
    return referral ? referral.label : id;
  };
  
  const getContactLabel = (method: string) => {
    const methods = {
      'phone': 'טלפון',
      'email': 'אימייל',
      'whatsapp': 'וואטסאפ',
    };
    return methods[method as keyof typeof methods] || method;
  };
  
  // Handle submit
  const handleSubmit = async () => {
    if (!isConfirmed) {
      return;
    }
    
    // Set submitting state
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      
      // Send data to API
      const response = await fetch('/api/submit-quote-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit form');
      }
      
      // Handle successful submission
      AnalyticsEvents.formSubmit('quote');
      setIsSubmitted(true);
      setCurrentStep(FormStep.THANK_YOU);
    } catch (error) {
      // Handle error
      setFormError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };
  
  // Section heading style
  const sectionHeading = "text-lg font-bold text-primary mb-2";
  const sectionContainer = "mb-6 p-4 bg-gray-50 rounded-lg";
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="form-review"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-frank font-bold text-secondary mb-6 text-center">
            סיכום פרטי הבקשה
          </h2>
          
          {/* Personal Info Section */}
          <div className={sectionContainer}>
            <h3 className={sectionHeading}>פרטים אישיים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">שם מלא</p>
                <p>{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">טלפון</p>
                <p dir="ltr">{formData.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">דוא״ל</p>
                <p dir="ltr">{formData.email}</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentStep(FormStep.PERSONAL_INFO)}
              className="text-primary hover:text-primary-dark text-sm mt-2 underline"
            >
              ערוך
            </button>
          </div>
          
          {/* Project Details Section */}
          <div className={sectionContainer}>
            <h3 className={sectionHeading}>פרטי הפרויקט</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">סוג הפרויקט</p>
                <p>{formData.projectType && getProjectTypeLabel(formData.projectType)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">לוח זמנים</p>
                <p>{formData.timeline && getTimelineLabel(formData.timeline)}</p>
              </div>
              {formData.area && (
                <div>
                  <p className="text-sm text-gray-500">שטח במ״ר</p>
                  <p>{formData.area}</p>
                </div>
              )}
              {formData.address && (
                <div>
                  <p className="text-sm text-gray-500">כתובת הפרויקט</p>
                  <p>{formData.address}</p>
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">תיאור הפרויקט</p>
                <p className="whitespace-pre-wrap">{formData.projectScope}</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentStep(FormStep.PROJECT_DETAILS)}
              className="text-primary hover:text-primary-dark text-sm mt-2 underline"
            >
              ערוך
            </button>
          </div>
          
          {/* Budget & Additional Info Section */}
          <div className={sectionContainer}>
            <h3 className={sectionHeading}>תקציב ופרטים נוספים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">טווח תקציב</p>
                <p>{formData.budget && getBudgetLabel(formData.budget)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">איך שמעת עלינו</p>
                <p>{formData.referralSource && getReferralLabel(formData.referralSource)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">דרך התקשרות מועדפת</p>
                <p>{formData.preferredContact && getContactLabel(formData.preferredContact)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">קבלת עדכונים במייל</p>
                <p>{formData.receiveUpdates ? 'כן' : 'לא'}</p>
              </div>
              {formData.additionalInfo && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">מידע נוסף</p>
                  <p className="whitespace-pre-wrap">{formData.additionalInfo}</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setCurrentStep(FormStep.BUDGET_INFO)}
              className="text-primary hover:text-primary-dark text-sm mt-2 underline"
            >
              ערוך
            </button>
          </div>
          
          {/* Confirmation Checkbox */}
          <div className="flex items-start mt-8">
            <div className="flex items-center h-5">
              <input
                id="confirm"
                type="checkbox"
                checked={isConfirmed}
                onChange={e => setIsConfirmed(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </div>
            <div className="mr-3 text-sm">
              <label htmlFor="confirm" className="text-gray-700">
                אני מאשר/ת כי הפרטים שמסרתי נכונים ומסכים/ה לתנאי השימוש ומדיניות הפרטיות
              </label>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              type="button"
              onClick={prevStep}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              חזרה
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting || !isConfirmed}
              whileHover={!isSubmitting && isConfirmed ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting && isConfirmed ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  שולח...
                </>
              ) : (
                <>
                  שלח בקשה
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormReview; 