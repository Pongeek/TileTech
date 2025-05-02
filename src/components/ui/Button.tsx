'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/utils/animation';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  isExternal = false,
  className = '',
  icon,
  iconPosition = 'right',
  isFullWidth = false,
  isDisabled = false,
  isLoading = false,
  onClick,
  ariaLabel,
  type = 'button',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Base classes for all button variants
  const baseClasses = "font-bold transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-opacity-90 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    icon: 'p-3 text-primary hover:bg-primary/10 focus:ring-primary',
  };
  
  // Full width class
  const fullWidthClass = isFullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Animation variants (if motion isn't reduced)
  const buttonVariants: Variants = {
    initial: {},
    hover: prefersReducedMotion ? {} : { scale: 1.05 },
    tap: prefersReducedMotion ? {} : { scale: 0.98 },
  };
  
  // Combined classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidthClass}
    ${disabledClasses}
    ${className}
  `;
  
  // Render icon based on position
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={`inline-flex items-center ${iconPosition === 'left' ? 'ml-0 mr-2' : 'mr-0 ml-2'}`}>
        {icon}
      </span>
    );
  };
  
  // Loading spinner
  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // Button content
  const buttonContent = (
    <>
      {isLoading && loadingSpinner}
      {icon && iconPosition === 'left' && renderIcon()}
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
    </>
  );
  
  // Render link if href is provided
  if (href) {
    const linkProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    
    if (!prefersReducedMotion) {
      return (
        <motion.div
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <Link 
            href={href}
            className={buttonClasses}
            onClick={onClick as any}
            aria-label={ariaLabel}
            {...linkProps}
          >
            {buttonContent}
          </Link>
        </motion.div>
      );
    }
    
    return (
      <Link 
        href={href}
        className={buttonClasses}
        onClick={onClick as any}
        aria-label={ariaLabel}
        {...linkProps}
      >
        {buttonContent}
      </Link>
    );
  }
  
  // Render button if no href
  if (!prefersReducedMotion) {
    return (
      <motion.button
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        className={buttonClasses}
        onClick={onClick}
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        type={type}
      >
        {buttonContent}
      </motion.button>
    );
  }
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel}
      type={type}
    >
      {buttonContent}
    </button>
  );
};

export default Button; 