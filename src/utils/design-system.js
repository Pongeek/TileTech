/**
 * Design System for TileTech
 * This file contains standardized values for spacing, typography, and component styles.
 * Use these values throughout the application to maintain consistency.
 */

/**
 * Spacing System
 * Standardized spacing values to use throughout the application.
 * Based on a 4px grid system, with common multipliers.
 */
export const spacing = {
  // Base spacing units
  xs: 'spacing-2', // 0.5rem = 8px
  sm: 'spacing-4', // 1rem = 16px
  md: 'spacing-6', // 1.5rem = 24px
  lg: 'spacing-8', // 2rem = 32px
  xl: 'spacing-12', // 3rem = 48px
  '2xl': 'spacing-16', // 4rem = 64px
  
  // Component-specific spacing
  card: {
    padding: 'p-6',
    gap: 'gap-6',
    margin: 'mb-8',
  },
  
  section: {
    padding: 'py-16',
    margin: 'mb-12',
  },
  
  button: {
    padding: 'px-6 py-3',
    smallPadding: 'px-4 py-2',
    iconPadding: 'p-3',
  },
  
  form: {
    gap: 'gap-6',
    inputPadding: 'px-4 py-3',
  },
};

/**
 * Typography System
 * Standardized typography values for consistent text styling.
 */
export const typography = {
  // Font families
  fontFamily: {
    heading: 'font-frank',
    body: 'font-assistant',
    accent: 'font-heebo',
  },
  
  // Font sizes
  fontSize: {
    xs: 'text-xs', // 0.75rem
    sm: 'text-sm', // 0.875rem
    base: 'text-base', // 1rem
    lg: 'text-lg', // 1.125rem
    xl: 'text-xl', // 1.25rem
    '2xl': 'text-2xl', // 1.5rem
    '3xl': 'text-3xl', // 1.875rem
    '4xl': 'text-4xl', // 2.25rem
  },
  
  // Font weights
  fontWeight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  
  // Line heights
  lineHeight: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  },
  
  // Heading styles
  headings: {
    h1: 'text-4xl font-frank font-bold text-secondary',
    h2: 'text-3xl font-frank font-bold text-secondary',
    h3: 'text-2xl font-frank font-bold text-secondary',
    h4: 'text-xl font-frank font-semibold text-secondary',
    h5: 'text-lg font-frank font-semibold text-secondary',
    h6: 'text-base font-frank font-semibold text-secondary',
  },
  
  // Text styles
  text: {
    body: 'text-base font-assistant text-gray-700',
    bodyLarge: 'text-lg font-assistant text-gray-700',
    caption: 'text-sm font-assistant text-gray-500',
    accent: 'font-heebo',
  },
};

/**
 * Shadow System
 * Standardized shadow values for consistent elevation.
 */
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  
  // Component-specific shadows
  card: 'shadow-md hover:shadow-lg transition-shadow duration-300',
  button: 'shadow hover:shadow-md transition-shadow duration-300',
  modal: 'shadow-2xl',
};

/**
 * Border Radius System
 * Standardized border radius values.
 */
export const borderRadius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  
  // Component-specific border radius
  card: 'rounded-lg',
  button: 'rounded-lg',
  buttonRound: 'rounded-full',
  input: 'rounded-md',
};

/**
 * Animation System
 * Standardized animation values for consistent motion.
 */
export const animation = {
  duration: {
    fast: 'duration-200',
    default: 'duration-300',
    slow: 'duration-500',
  },
  
  easing: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
  },
  
  transition: {
    default: 'transition-all duration-300 ease-in-out',
    fast: 'transition-all duration-200 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
  },
  
  hover: {
    scale: 'hover:scale-105',
    scaleSmall: 'hover:scale-[1.02]',
    translateY: 'hover:-translate-y-1',
  },
};

/**
 * Component Styles
 * Pre-defined styles for common components.
 */
export const componentStyles = {
  button: {
    primary: 'bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all hover:shadow-md active:scale-[0.98]',
    secondary: 'bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all hover:shadow-md active:scale-[0.98]',
    accent: 'bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all hover:shadow-md active:scale-[0.98]',
    outline: 'border-2 border-primary text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-all hover:shadow-md active:scale-[0.98]',
    ghost: 'text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-bold transition-all active:scale-[0.98]',
    icon: 'p-3 rounded-full hover:bg-primary/10 transition-all active:scale-[0.98]',
  },
  
  card: {
    default: 'bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden',
    hover: 'bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden',
    bordered: 'bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md overflow-hidden',
  },
  
  input: {
    default: 'w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 transition-all',
    error: 'w-full px-4 py-3 rounded-md border border-red-500 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all',
    disabled: 'w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed',
  },
  
  label: {
    default: 'block text-gray-700 font-medium mb-2',
    error: 'block text-red-500 font-medium mb-2',
  },
  
  errorMessage: 'mt-1 text-sm text-red-500',
  
  container: {
    default: 'mx-auto px-4 max-w-7xl',
    narrow: 'mx-auto px-4 max-w-5xl',
    wide: 'mx-auto px-4 max-w-[90rem]',
  },
  
  divider: {
    default: 'h-px bg-gray-200 my-8',
    short: 'h-1 w-24 bg-primary rounded-full my-6',
  },
};

/**
 * Accessibility Utilities
 * Helper utilities for ensuring accessible UI
 */
export const a11y = {
  srOnly: 'sr-only',
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  reducedMotion: {
    base: 'motion-reduce:transition-none motion-reduce:transform-none',
    noAnimation: 'motion-reduce:animate-none',
  },
};

export default {
  spacing,
  typography,
  shadows,
  borderRadius,
  animation,
  componentStyles,
  a11y,
}; 