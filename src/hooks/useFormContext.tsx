'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  type QuoteFormData,
  type PersonalInfoInputs,
  type ProjectDetailsInputs,
  type BudgetInfoInputs
} from '@/utils/validationSchemas';

// Define form steps
export enum FormStep {
  PERSONAL_INFO = 0,
  PROJECT_DETAILS = 1,
  BUDGET_INFO = 2,
  REVIEW = 3,
  THANK_YOU = 4,
}

// Form context type
interface FormContextType {
  // Current step
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Form data
  formData: Partial<QuoteFormData>;
  updateFormData: (step: string, data: Partial<QuoteFormData>) => void;
  
  // Form state
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  formError: string | null;
  setFormError: (error: string | null) => void;
  
  // Submission status
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
  
  // Reset form
  resetForm: () => void;
  
  // Step data
  personalInfo: Partial<PersonalInfoInputs>;
  projectDetails: Partial<ProjectDetailsInputs>;
  budgetInfo: Partial<BudgetInfoInputs>;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Initial form data
const initialFormData: Partial<QuoteFormData> = {};

// Form provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Current step state
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PERSONAL_INFO);
  
  // Form data state
  const [formData, setFormData] = useState<Partial<QuoteFormData>>(initialFormData);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Navigate to next step
  const nextStep = () => {
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      if (nextStep > FormStep.THANK_YOU) return prev;
      return nextStep;
    });
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep((prev) => {
      const prevStep = prev - 1;
      if (prevStep < FormStep.PERSONAL_INFO) return prev;
      return prevStep;
    });
  };
  
  // Update form data by step
  const updateFormData = (step: string, data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };
  
  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(FormStep.PERSONAL_INFO);
    setIsSubmitting(false);
    setFormError(null);
    setIsSubmitted(false);
  };

  // Extract step-specific data
  const personalInfo: Partial<PersonalInfoInputs> = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
  };

  const projectDetails: Partial<ProjectDetailsInputs> = {
    projectType: formData.projectType,
    projectScope: formData.projectScope,
    timeline: formData.timeline,
    area: formData.area,
    address: formData.address,
  };

  const budgetInfo: Partial<BudgetInfoInputs> = {
    budget: formData.budget,
    additionalInfo: formData.additionalInfo,
    referralSource: formData.referralSource,
    preferredContact: formData.preferredContact,
    receiveUpdates: formData.receiveUpdates,
  };
  
  // Context value
  const value: FormContextType = {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    formData,
    updateFormData,
    isSubmitting,
    setIsSubmitting,
    formError,
    setFormError,
    isSubmitted,
    setIsSubmitted,
    resetForm,
    personalInfo,
    projectDetails,
    budgetInfo,
  };
  
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default useFormContext; 