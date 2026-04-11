'use client';

import React from 'react';
import { FormProvider, useFormContext, FormStep } from '@/hooks/useFormContext';
import PersonalInfoForm from './form-steps/PersonalInfoForm';
import ProjectDetailsForm from './form-steps/ProjectDetailsForm';
import BudgetInfoForm from './form-steps/BudgetInfoForm';
import FormReview from './form-steps/FormReview';
import ThankYouStep from './form-steps/ThankYouStep';
import FormProgress from './form-steps/FormProgress';

export const QuoteFormWrapper: React.FC = () => (
  <FormProvider>
    <QuoteForm />
  </FormProvider>
);

const QuoteForm: React.FC = () => {
  const { currentStep, formError, isSubmitting } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.PERSONAL_INFO:    return <PersonalInfoForm />;
      case FormStep.PROJECT_DETAILS:  return <ProjectDetailsForm />;
      case FormStep.BUDGET_INFO:      return <BudgetInfoForm />;
      case FormStep.REVIEW:           return <FormReview />;
      case FormStep.THANK_YOU:        return <ThankYouStep />;
      default:                        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 border border-gray-100 p-8 w-full max-w-3xl mx-auto">
      {/* Progress indicator */}
      {currentStep < FormStep.THANK_YOU && <FormProgress />}

      {/* Step content */}
      <div className="mt-8">
        {renderStep()}
      </div>

      {/* Error message */}
      {formError && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <p className="font-assistant text-sm font-medium">{formError}</p>
        </div>
      )}

      {/* Submitting overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-elevation-3 p-8 text-center max-w-xs mx-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-frank font-bold text-secondary text-lg">שולח את הטופס...</p>
            <p className="font-assistant text-gray-500 text-sm mt-1">אנא המתינו</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteFormWrapper;
