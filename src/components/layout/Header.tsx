'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-white py-1 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container-custom flex justify-between items-center">
        <div className="flex-1 text-right">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white ml-1.5">
              <span className="font-bold text-sm">TT</span>
            </div>
            <h1 className="text-lg font-frank font-bold text-secondary">TileTech</h1>
          </Link>
        </div>
        
        {/* Mobile hamburger button - Made more compact */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-5 h-0.5 bg-secondary transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-secondary transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-0.5 bg-secondary transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 justify-end">
          <ul className="flex space-x-4 rtl:space-x-reverse text-secondary font-heebo text-sm">
            <li>
              <Link href="#services" className="hover:text-primary transition-colors">
                שירותים
              </Link>
            </li>
            <li>
              <Link href="#gallery" className="hover:text-primary transition-colors">
                גלריה
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-primary transition-colors">
                המלצות
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-primary transition-colors">
                צור קשר
              </Link>
            </li>
            <li>
              <Link href="#contact" className="btn-primary text-sm py-1 px-2">
                הצעת מחיר
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Dimmed overlay – clicking it closes the menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile navigation panel */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Close (X) button */}
          <button
            className="absolute top-4 left-4 p-2 text-secondary rounded-full hover:bg-primary-light/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={toggleMenu}
            aria-label="סגור תפריט"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="container-custom pt-20 pb-6">
            <nav>
              <ul className="flex flex-col space-y-4 text-right text-secondary font-heebo text-xl">
                <li>
                  <Link href="#services" className="block hover:text-primary transition-colors py-2" onClick={toggleMenu}>
                    שירותים
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="block hover:text-primary transition-colors py-2" onClick={toggleMenu}>
                    גלריה
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="block hover:text-primary transition-colors py-2" onClick={toggleMenu}>
                    המלצות
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="block hover:text-primary transition-colors py-2" onClick={toggleMenu}>
                    צור קשר
                  </Link>
                </li>
                <li className="pt-4">
                  <Link href="#contact" className="btn-primary block text-center" onClick={toggleMenu}>
                    הצעת מחיר
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 