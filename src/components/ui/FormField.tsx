'use client';

import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  dir?: 'rtl' | 'ltr' | 'auto';
  children?: React.ReactNode;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  className = '',
  min,
  max,
  step,
  inputMode,
  dir,
  children,
  rows,
}) => {
  // Generate a unique ID for the input
  const id = `form-field-${name}`;
  
  // Common classes for all form fields
  const inputClasses = `w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
    error ? 'border-red-500 bg-red-50' : 'border-gray-300'
  } ${
    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
  } ${className}`;
  
  // Render different input types
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          rows={rows || 3}
          dir={dir}
          className={inputClasses}
        />
      );
    }
    
    if (type === 'select') {
      return (
        <select
          id={id}
          {...register(name)}
          disabled={disabled}
          className={inputClasses}
          dir={dir}
        >
          {children}
        </select>
      );
    }
    
    // Default input element
    return (
      <input
        id={id}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        inputMode={inputMode}
        dir={dir}
        className={inputClasses}
      />
    );
  };
  
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      
      {renderInput()}
      
      {/* Error message */}
      {error && (
        <div className="mt-1 text-sm text-red-600" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default FormField; 