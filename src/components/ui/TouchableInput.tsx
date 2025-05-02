'use client';

import React, { useState, forwardRef } from 'react';
import { useIsTouchDevice } from '@/utils/mobile';

export interface TouchableInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  wrapperClassName?: string;
  showErrorIcon?: boolean;
  infoText?: string;
}

/**
 * TouchableInput Component
 * A mobile-optimized input component with proper touch handling and feedback
 */
const TouchableInput = forwardRef<HTMLInputElement, TouchableInputProps>(
  (
    {
      label,
      error,
      className = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      startIcon,
      endIcon,
      wrapperClassName = '',
      showErrorIcon = true,
      infoText,
      ...props
    },
    ref
  ) => {
    const isTouch = useIsTouchDevice();
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error;

    // Base wrapper classes for layout
    const baseWrapperClasses = 'mb-4';

    // Label classes based on state (error, focus, etc.)
    const baseLabelClasses = 'block text-sm font-medium mb-1';
    const labelStateClasses = hasError ? 'text-red-600' : 'text-gray-700';

    // Input wrapper for proper icon layout
    const inputWrapperClasses = `
      relative
      rounded-md
      overflow-hidden
      ${startIcon ? 'pl-10' : ''}
      ${endIcon || (hasError && showErrorIcon) ? 'pr-10' : ''}
      ${hasError ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-gray-300 focus-within:ring-primary focus-within:border-primary'}
      ${isFocused ? 'ring-2 ring-opacity-50' : ''}
    `.trim();

    // Base classes for the input itself
    const baseInputClasses = `
      block
      w-full
      min-h-[48px]
      px-4
      py-3
      border-gray-300
      shadow-sm
      focus:outline-none
      transition-colors
      ${hasError ? 'text-red-900 placeholder-red-300' : 'text-gray-900 placeholder-gray-400'}
      ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
      ${isTouch ? 'text-lg' : 'text-base'} 
    `.trim();

    // Error message classes
    const baseErrorClasses = 'mt-1 text-sm text-red-600';

    // Info text classes
    const baseInfoClasses = 'mt-1 text-sm text-gray-500';

    // Combined classes
    const wrapperClasses = `${baseWrapperClasses} ${wrapperClassName}`.trim();
    const labelClasses = `${baseLabelClasses} ${labelStateClasses} ${labelClassName}`.trim();
    const inputContainerClasses = `${inputWrapperClasses}`.trim();
    const inputClasses = `${baseInputClasses} ${inputClassName}`.trim();
    const errorClasses = `${baseErrorClasses} ${errorClassName}`.trim();
    const infoClasses = `${baseInfoClasses}`.trim();

    // Handle focus/blur events to show visual feedback
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    // Error icon (shown when there's an error)
    const errorIcon = hasError && showErrorIcon && (
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
    );

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={props.id} className={labelClasses}>
            {label}
          </label>
        )}

        <div className={inputContainerClasses}>
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            className={inputClasses}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />

          {endIcon && !errorIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {endIcon}
            </div>
          )}

          {errorIcon}
        </div>

        {hasError && (
          <p className={errorClasses} id={`${props.id}-error`}>
            {error}
          </p>
        )}

        {infoText && !hasError && (
          <p className={infoClasses}>
            {infoText}
          </p>
        )}
      </div>
    );
  }
);

TouchableInput.displayName = 'TouchableInput';

export default TouchableInput; 