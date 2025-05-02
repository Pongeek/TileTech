import React from 'react';
import { typography } from '@/utils/design-system';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodyLarge' | 'caption' | 'accent';
  align?: 'left' | 'center' | 'right';
  color?: 'primary' | 'secondary' | 'accent' | 'default' | 'light' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  truncate?: boolean;
  id?: string;
}

/**
 * Typography Component
 * Standardized text component for consistent typography hierarchy
 */
const Typography: React.FC<TypographyProps> = ({
  children,
  className = '',
  as,
  variant = 'body',
  align = 'inherit',
  color = 'default',
  weight,
  truncate = false,
  id,
}) => {
  // Determine element type based on variant if not provided
  const Element = as || (() => {
    switch (variant) {
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      case 'caption':
        return 'span';
      default:
        return 'p';
    }
  })();

  // Get variant styling from design system
  const variantClasses = (() => {
    switch (variant) {
      case 'h1':
        return typography.headings.h1;
      case 'h2':
        return typography.headings.h2;
      case 'h3':
        return typography.headings.h3;
      case 'h4':
        return typography.headings.h4;
      case 'h5':
        return typography.headings.h5;
      case 'h6':
        return typography.headings.h6;
      case 'bodyLarge':
        return typography.text.bodyLarge;
      case 'caption':
        return typography.text.caption;
      case 'accent':
        return typography.text.accent;
      case 'body':
      default:
        return typography.text.body;
    }
  })();

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    inherit: '',
  }[align];

  // Text color classes
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    default: '',
    light: 'text-gray-100',
    muted: 'text-gray-500',
  }[color];

  // Font weight classes (only if specified)
  const weightClasses = weight ? typography.fontWeight[weight] : '';

  // Truncate text if needed
  const truncateClasses = truncate ? 'truncate' : '';

  // Combine all classes
  const combinedClasses = `
    ${variantClasses}
    ${alignClasses}
    ${colorClasses}
    ${weightClasses}
    ${truncateClasses}
    ${className}
  `.trim();

  return (
    <Element className={combinedClasses} id={id}>
      {children}
    </Element>
  );
};

// Convenience components
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h1" />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h2" />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h3" />
);

export const Heading4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h4" />
);

export const Heading5: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h5" />
);

export const Heading6: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h6" />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="body" />
);

export const BodyLarge: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="bodyLarge" />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="caption" />
);

export const AccentText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="accent" />
);

export default Typography; 