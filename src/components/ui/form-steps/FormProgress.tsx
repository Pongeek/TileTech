'use client';

import React, { useMemo } from 'react';
import { useFormContext, FormStep } from '@/hooks/useFormContext';
import { motion } from 'framer-motion';

const FormProgress: React.FC = () => {
  const { currentStep, setCurrentStep } = useFormContext();
  
  // Define steps - memoized to avoid recreation on each render
  const steps = useMemo(() => [
    { id: FormStep.PERSONAL_INFO, label: 'פרטים אישיים' },
    { id: FormStep.PROJECT_DETAILS, label: 'פרטי הפרויקט' },
    { id: FormStep.BUDGET_INFO, label: 'תקציב ומידע נוסף' },
    { id: FormStep.REVIEW, label: 'סיכום ושליחה' },
  ], []);
  
  // Check if a step is completed
  const isCompleted = (stepId: FormStep) => {
    return currentStep > stepId;
  };
  
  // Check if a step is active
  const isActive = (stepId: FormStep) => {
    return currentStep === stepId;
  };
  
  // Navigate to a step (only allowed to navigate to completed steps or current+1)
  const goToStep = (stepId: FormStep) => {
    if (isCompleted(stepId) || stepId === currentStep || stepId === currentStep + 1) {
      setCurrentStep(stepId);
    }
  };

  // Calculate progress percentage for RTL direction
  const progressPercentage = useMemo(() => {
    return (100 / (steps.length - 1)) * Math.min(currentStep, steps.length - 1);
  }, [currentStep, steps.length]);
  
  return (
    <div className="w-full">
      {/* Progress bar with increased spacing */}
      <div className="relative mt-10">
        {/* Background bar */}
        <div className="absolute top-[10px] left-0 right-0 h-0.5 bg-gray-200 z-0" />
        
        {/* Progress bar - RTL direction (right to left) */}
        <div 
          className="absolute top-[10px] right-0 h-0.5 bg-primary z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${progressPercentage}%`
          }}
        />
        
        {/* Step indicators */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Circle container - focus ring applied here only */}
              <button
                onClick={() => goToStep(step.id)}
                disabled={!isCompleted(step.id) && step.id !== currentStep && step.id !== currentStep + 1}
                className={`mb-2 transition-all duration-200 
                  ${isActive(step.id) ? 'focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 rounded-full' : ''}
                  ${isCompleted(step.id) || isActive(step.id) 
                    ? 'cursor-pointer' 
                    : step.id === currentStep + 1 
                      ? 'cursor-pointer opacity-60' 
                      : 'cursor-not-allowed opacity-40'
                  }`}
                aria-current={isActive(step.id) ? 'step' : undefined}
              >
                {/* Circle indicator */}
                <div className="flex items-center justify-center">
                  {isCompleted(step.id) ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      // Only animate active step for better performance
                      animate={isActive(step.id) ? { scale: [1, 1.05, 1] } : undefined}
                      transition={{ duration: 0.5 }}
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium shadow-md
                        ${isActive(step.id) 
                          ? 'bg-primary text-white' 
                          : 'bg-white border-2 border-gray-300 text-gray-500'
                        }`}
                    >
                      {step.id + 1}
                    </motion.div>
                  )}
                </div>
              </button>
              
              {/* Text label - separate from button to avoid focus ring around it */}
              <span 
                className={`text-xs font-medium 
                  ${isActive(step.id) 
                    ? 'text-primary font-bold' 
                    : isCompleted(step.id) 
                      ? 'text-primary' 
                      : 'text-gray-500'
                  }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FormProgress); 