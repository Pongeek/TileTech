import React from 'react';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  axis?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Size to pixel mapping based on design system
 */
const sizeMap = {
  xs: '0.5rem', // 8px
  sm: '1rem',   // 16px
  md: '1.5rem', // 24px
  lg: '2rem',   // 32px
  xl: '3rem',   // 48px
  '2xl': '4rem', // 64px
  '3xl': '6rem', // 96px
};

/**
 * Spacer Component
 * A utility component to add consistent spacing between elements
 */
const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  axis = 'vertical',
  className = '',
  style = {},
}) => {
  const spacerSize = sizeMap[size];
  
  const spacerStyle = {
    ...style,
    ...(axis === 'horizontal'
      ? { width: spacerSize, minWidth: spacerSize, height: '1px' }
      : { height: spacerSize, minHeight: spacerSize, width: '1px' }),
  };

  return (
    <div
      className={`block ${className}`}
      style={spacerStyle}
      aria-hidden="true"
    />
  );
};

/**
 * Stack Component
 * A layout utility that adds consistent spacing between child elements
 */
interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
}) => {
  // Direction classes
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
  
  // Alignment classes
  const alignmentMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  
  // Justification classes
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };
  
  // Spacing class
  const spacingMap = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
    '2xl': 'gap-16',
    '3xl': 'gap-24',
  };
  
  // Wrap class
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';
  
  const stackClasses = `
    flex
    ${directionClass}
    ${alignmentMap[align]}
    ${justifyMap[justify]}
    ${spacingMap[spacing]}
    ${wrapClass}
    ${className}
  `.trim();
  
  return (
    <div className={stackClasses}>
      {children}
    </div>
  );
};

export default Spacer; 