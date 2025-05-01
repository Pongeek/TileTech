'use client';

import React from 'react';
import { FormProvider, useFormContext, FormStep } from '@/hooks/useFormContext';
import PersonalInfoForm from './form-steps/PersonalInfoForm';
import ProjectDetailsForm from './form-steps/ProjectDetailsForm';
import BudgetInfoForm from './form-steps/BudgetInfoForm';
import FormReview from './form-steps/FormReview';
import ThankYouStep from './form-steps/ThankYouStep';
import FormProgress from './form-steps/FormProgress';

// QuoteFormWrapper component that provides the context
export const QuoteFormWrapper: React.FC = () => {
  return (
    <FormProvider>
      <QuoteForm />
    </FormProvider>
  );
};

// Main form component
const QuoteForm: React.FC = () => {
  const { 
    currentStep,
    formError, 
    isSubmitting
  } = useFormContext();

  // Determine which step to render
  const renderStep = () => {
    switch (currentStep) {
      case FormStep.PERSONAL_INFO:
        return <PersonalInfoForm />;
      case FormStep.PROJECT_DETAILS:
        return <ProjectDetailsForm />;
      case FormStep.BUDGET_INFO:
        return <BudgetInfoForm />;
      case FormStep.REVIEW:
        return <FormReview />;
      case FormStep.THANK_YOU:
        return <ThankYouStep />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto">
      {/* Progress indicator */}
      {currentStep < FormStep.THANK_YOU && (
        <FormProgress />
      )}
      
      {/* Form content */}
      <div className="mt-8">
        {renderStep()}
      </div>
      
      {/* Error display */}
      {formError && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="font-medium">{formError}</p>
        </div>
      )}
      
      {/* Loading overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <div className="animate-spin mb-4 mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="text-lg font-medium">שולח את הטופס...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteFormWrapper; 