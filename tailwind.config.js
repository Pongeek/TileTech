/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C66',
        secondary: '#964B00',
        accent: '#9CAF88',
        neutral: '#E5E5E0',
        'primary-light': '#D88',
        'primary-dark': '#A44',
        'secondary-light': '#A86C2A',
        'secondary-dark': '#6A3500',
        'accent-light': '#B3C1A3',
        'accent-dark': '#7A8C6A',
        'neutral-light': '#F0F0EB',
        'neutral-dark': '#CECEC9',
      },
      fontFamily: {
        'frank': ['var(--font-frank)', 'serif'],
        'heebo': ['var(--font-heebo)', 'sans-serif'],
        'assistant': ['var(--font-assistant)', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'fadeInDown': 'fadeInDown 0.5s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.5s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.5s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s ease-out forwards',
        'slideIn': 'slideIn 0.5s ease-out forwards',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-minimal': 'pulse-minimal 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'pulse-minimal': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.05)',
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1)',
        'elevation-4': '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      zIndex: {
        'behind': '-1',
        'lowest': '0',
        'low': '10',
        'medium': '20',
        'high': '30',
        'highest': '40',
        'modal': '50',
        'overlay': '100',
        'tooltip': '1000',
      },
      borderRadius: {
        'xl': '1rem', 
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'smooth-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
    function({ addVariant, e }) {
      addVariant('focus-visible', ['&:focus-visible', '.js-focus-visible &:focus.focus-visible']);
      
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
      
      addVariant('contrast-more', '@media (prefers-contrast: more)');
      
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('supports-hover', '@media (hover: hover)');
    },
    function({ addUtilities }) {
      const newUtilities = {
        '.touch-feedback': {
          transition: 'transform 0.15s ease-in-out, opacity 0.15s ease-in-out',
          '&:active': {
            transform: 'scale(0.95)',
            opacity: '0.9',
          },
        },
        '.focus-ring': {
          '@apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white': {},
        },
        '.placeholder-improved': {
          '@apply placeholder-gray-400 placeholder-opacity-80': {},
          'transition': 'all 0.2s ease-in-out',
          '&:focus::placeholder': {
            '@apply text-gray-300': {},
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover', 'focus']);
    },
  ],
}; 