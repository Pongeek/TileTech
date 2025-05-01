import { Frank_Ruhl_Libre, Heebo, Assistant } from 'next/font/google';

// Define the Frank Ruhl Libre font with subset optimization
export const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  fallback: ['serif'],
  variable: '--font-frank',
  preload: true,
});

// Define the Heebo font with subset optimization
export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  fallback: ['sans-serif'],
  variable: '--font-heebo',
  preload: true,
});

// Define the Assistant font with subset optimization
export const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  fallback: ['sans-serif'],
  variable: '--font-assistant',
  preload: true,
}); 