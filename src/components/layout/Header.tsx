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
    <header className={`bg-white py-4 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container-custom flex justify-between items-center">
        <div className="flex-1 text-right">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white ml-2">
              <span className="font-bold">TT</span>
            </div>
            <h1 className="text-2xl font-frank font-bold text-secondary">TileTech</h1>
          </Link>
        </div>
        
        {/* Mobile hamburger button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-secondary transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-secondary transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-secondary transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 justify-end">
          <ul className="flex space-x-6 rtl:space-x-reverse text-secondary font-heebo">
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
              <Link href="#contact" className="btn-primary">
                הצעת מחיר
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Mobile navigation overlay */}
        <div className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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