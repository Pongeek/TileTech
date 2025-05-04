'use client';

import React, { useMemo } from 'react';
import { useFormContext, FormStep } from '@/hooks/useFormContext';

// Constant values used throughout the component
const CIRCLE_SIZE = "w-5 h-5";
const ACTIVE_RING_CLASS = "absolute rounded-full border border-primary top-[-3px] left-[-3px] w-[26px] h-[26px] border-[1.5px]";
const TEXT_ALIGNMENT = "relative translate-x-[5px]";

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
        <div className="absolute left-0 right-0 bg-gray-200 z-0 h-[2px] top-[11px]" />
        
        {/* Progress bar */}
        <div 
          className="absolute right-0 bg-primary z-0 transition-all duration-300 ease-in-out h-[2px] top-[11px]"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Step indicators */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="relative mb-2">
                {/* Active ring */}
                {isActive(step.id) && (
                  <div className={ACTIVE_RING_CLASS} />
                )}
                
                {/* Button */}
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={!isCompleted(step.id) && step.id !== currentStep && step.id !== currentStep + 1}
                  className={`
                    ${CIRCLE_SIZE} rounded-full flex items-center justify-center
                    ${isCompleted(step.id) || isActive(step.id) 
                      ? 'cursor-pointer' 
                      : step.id === currentStep + 1 
                        ? 'cursor-pointer opacity-60' 
                        : 'cursor-not-allowed opacity-40'
                    }
                    ${isCompleted(step.id) || isActive(step.id)
                      ? 'bg-primary text-white border-0'
                      : 'bg-white border-2 border-gray-300 text-gray-500'
                    }
                  `}
                  aria-current={isActive(step.id) ? 'step' : undefined}
                  type="button"
                  style={{ minWidth: '20px', minHeight: '20px' }}
                >
                  {isCompleted(step.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-medium">{step.id + 1}</span>
                  )}
                </button>
              </div>
              
              {/* Text label */}
              <span 
                className={`text-xs font-medium ${TEXT_ALIGNMENT}
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

export default FormProgress; 