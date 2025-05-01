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
      },
      fontFamily: {
        'frank': ['var(--font-frank)', 'serif'],
        'heebo': ['var(--font-heebo)', 'sans-serif'],
        'assistant': ['var(--font-assistant)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}; 