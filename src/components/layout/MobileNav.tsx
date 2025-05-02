'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTouchFeedback } from '@/utils/mobile';
import { usePrefersReducedMotion } from '@/utils/animation';

interface MobileNavProps {
  className?: string;
  links: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

/**
 * MobileNav Component
 * A mobile-optimized navigation with smooth animations and touch feedback
 */
const MobileNav: React.FC<MobileNavProps> = ({
  className = '',
  links
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { touchProps, touchClass } = useTouchFeedback();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle clicking a link in the menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Animation variants for the menu
  const menuVariants = prefersReducedMotion
    ? {
        closed: { opacity: 0, display: 'none' },
        open: { opacity: 1, display: 'block' },
      }
    : {
        closed: {
          x: '100%',
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
          }
        },
        open: {
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }
        }
      };

  // Animation variants for menu links (staggered animations)
  const linkVariants = prefersReducedMotion
    ? {
        closed: { opacity: 0 },
        open: { opacity: 1 }
      }
    : {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }
        })
      };

  return (
    <div className={`lg:hidden ${className}`}>
      {/* Hamburger Button */}
      <button 
        className={`
          p-2 text-primary rounded-lg hover:bg-primary-light/10
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          touch-manipulation
          min-h-[48px] min-w-[48px]
          ${touchClass}
        `}
        onClick={toggleMenu}
        aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        {...touchProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <motion.div
        id="mobile-menu"
        className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-8">
            <div className="font-bold text-xl text-secondary">תפריט</div>
            <button
              className={`
                p-2 text-primary rounded-full hover:bg-primary-light/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                min-h-[48px] min-w-[48px]
                ${touchClass}
              `}
              onClick={toggleMenu}
              aria-label="סגור תפריט"
              {...touchProps}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-2">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
              >
                <Link
                  href={link.href}
                  className={`
                    flex items-center py-4 px-6 rounded-lg
                    text-lg font-medium text-secondary
                    hover:bg-primary-light/10
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    active:bg-primary-light/20
                    touch-manipulation
                    min-h-[54px]
                    ${touchClass}
                  `}
                  onClick={handleLinkClick}
                  {...touchProps}
                >
                  {link.icon && (
                    <span className="ml-3">
                      {link.icon}
                    </span>
                  )}
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Contact Info */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <a
              href="tel:+972501234567"
              className={`
                flex items-center p-4 rounded-lg
                text-base text-primary font-medium
                hover:bg-primary-light/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                active:bg-primary-light/20
                touch-manipulation
                min-h-[48px]
                ${touchClass}
              `}
              {...touchProps}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              050-1234567
            </a>
            
            <a
              href="mailto:info@tiletech.co.il"
              className={`
                flex items-center p-4 rounded-lg
                text-base text-primary font-medium
                hover:bg-primary-light/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                active:bg-primary-light/20
                touch-manipulation
                min-h-[48px]
                ${touchClass}
              `}
              {...touchProps}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              info@tiletech.co.il
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileNav; 