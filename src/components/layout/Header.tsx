'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#services', label: 'שירותים' },
  { href: '#projects', label: 'פרויקטים' },
  { href: '#testimonials', label: 'המלצות' },
  { href: '#contact', label: 'צור קשר' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Determine active section
      const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`bg-white fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'shadow-elevation-2 py-2' : 'py-3'
      }`}
    >
      <div className="container-custom flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="TileTech - דף הבית">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
            <span className="font-frank font-bold text-sm leading-none">TT</span>
          </div>
          <span className="text-xl font-frank font-bold text-secondary leading-none">TileTech</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="ניווט ראשי">
          <ul className="flex items-center gap-1 font-heebo text-sm text-secondary rtl:space-x-reverse">
            {navLinks.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'text-primary font-semibold bg-primary/5'
                        : 'hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 mx-2" aria-hidden="true" />

          {/* Phone quick link */}
          <a
            href="tel:+9720544727746"
            className="flex items-center gap-1.5 text-sm font-heebo text-secondary hover:text-primary transition-colors px-2 py-1"
            aria-label="התקשרו אלינו"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            054-4727746
          </a>

          {/* CTA button */}
          <Link href="#contact" className="btn-primary text-sm py-2 px-4 mr-1">
            הצעת מחיר
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-5 h-0.5 bg-secondary transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-0.5 bg-secondary my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-5 h-0.5 bg-secondary transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white z-50 shadow-elevation-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 left-4 p-2 text-secondary rounded-full hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={closeMenu}
          aria-label="סגור תפריט"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pt-16 pb-8 px-6">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white">
              <span className="font-frank font-bold text-sm">TT</span>
            </div>
            <span className="text-xl font-frank font-bold text-secondary">TileTech</span>
          </div>

          <nav aria-label="ניווט מובייל">
            <ul className="flex flex-col space-y-1 text-secondary font-heebo text-xl mb-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block hover:text-primary transition-colors py-3 border-b border-gray-100"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile contact info */}
          <div className="space-y-3 mb-6">
            <a
              href="tel:+9720544727746"
              className="flex items-center gap-3 text-secondary hover:text-primary transition-colors font-assistant"
              onClick={closeMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              054-4727746
            </a>
          </div>

          <Link href="#contact" className="btn-primary block text-center text-lg" onClick={closeMenu}>
            קבל הצעת מחיר
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
