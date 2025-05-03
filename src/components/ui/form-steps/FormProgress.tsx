'use client';

import React, { useMemo } from 'react';
import { useFormContext, FormStep } from '@/hooks/useFormContext';

// Define CSS variables for consistent sizing
const CIRCLE_SIZE = "20px";
const LINE_HEIGHT = "2px";
const LINE_TOP_POSITION = "10px"; // Half of circle size
const PRIMARY_COLOR = "#dc2626"; // Hardcoded primary color for consistency
const TEXT_OFFSET = "-3px"; // Offset to align text with steps (negative = left)

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
        <div 
          className="absolute left-0 right-0 bg-gray-200 z-0" 
          style={{ 
            height: LINE_HEIGHT, 
            top: LINE_TOP_POSITION
          }}
        />
        
        {/* Progress bar */}
        <div 
          className="absolute right-0 bg-primary z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${progressPercentage}%`,
            height: LINE_HEIGHT,
            top: LINE_TOP_POSITION
          }}
        />
        
        {/* Step indicators */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Circle container */}
              <button
                onClick={() => goToStep(step.id)}
                disabled={!isCompleted(step.id) && step.id !== currentStep && step.id !== currentStep + 1}
                className={`relative mb-2 transition-all duration-200
                  ${isCompleted(step.id) || isActive(step.id) 
                    ? 'cursor-pointer' 
                    : step.id === currentStep + 1 
                      ? 'cursor-pointer opacity-60' 
                      : 'cursor-not-allowed opacity-40'
                  }`}
                aria-current={isActive(step.id) ? 'step' : undefined}
              >
                {/* Active ring (separate element for better cross-environment compatibility) */}
                {isActive(step.id) && (
                  <div 
                    className="absolute rounded-full" 
                    style={{
                      top: "-3px",
                      left: "-3px", 
                      right: "-3px",
                      bottom: "-3px",
                      border: `2px solid ${PRIMARY_COLOR}`,
                      zIndex: 0
                    }}
                  />
                )}
                
                {/* Circle indicator */}
                <div className="flex items-center justify-center">
                  {isCompleted(step.id) ? (
                    <div
                      className="rounded-full bg-primary text-white flex items-center justify-center relative z-10"
                      style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className={`rounded-full flex items-center justify-center text-xs font-medium relative z-10
                        ${isActive(step.id) 
                          ? 'bg-primary text-white' 
                          : 'bg-white border-2 border-gray-300 text-gray-500'
                        }`}
                      style={{ 
                        width: CIRCLE_SIZE, 
                        height: CIRCLE_SIZE
                      }}
                    >
                      {step.id + 1}
                    </div>
                  )}
                </div>
              </button>
              
              {/* Text label with position adjustment */}
              <span 
                className={`text-xs font-medium 
                  ${isActive(step.id) 
                    ? 'text-primary font-bold' 
                    : isCompleted(step.id) 
                      ? 'text-primary' 
                      : 'text-gray-500'
                  }`}
                style={{ position: 'relative', right: TEXT_OFFSET }}
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