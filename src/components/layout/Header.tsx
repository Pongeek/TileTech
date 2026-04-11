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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-elevation-2'
          : 'bg-white'
      }`}
    >
      {/* Top info bar — slides away on scroll */}
      <div
        className={`bg-secondary text-white overflow-hidden transition-all duration-300 hidden md:block ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="container-custom flex justify-between items-center py-1.5 text-xs font-heebo">
          <a
            href="tel:+9720544727746"
            className="flex items-center gap-1.5 hover:text-neutral-light transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            054-4727746
          </a>
          <span className="text-white/70">שירותי ריצוף ושיפוץ מקצועיים ברחבי הארץ</span>
        </div>
      </div>

      {/* Main nav bar */}
      <div className={`border-b transition-colors duration-300 ${scrolled ? 'border-gray-200' : 'border-gray-100'}`}>
        <div className="container-custom flex justify-between items-center py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="TileTech - דף הבית">
            <div className="relative w-10 h-10 shrink-0">
              <div className="absolute inset-0 bg-primary rotate-45 rounded-sm transition-transform duration-300 group-hover:rotate-[50deg]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-frank font-bold text-xs text-white leading-none relative z-10">TT</span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-frank font-bold text-secondary leading-none">TileTech</span>
              <span className="text-[10px] font-heebo text-gray-400 tracking-wide">ריצוף ושיפוץ</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="ניווט ראשי">
            <ul className="flex items-center font-heebo text-sm text-secondary">
              {navLinks.map(({ href, label }) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative px-4 py-2 transition-colors flex flex-col items-center group ${
                        isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-1/2'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mx-3" aria-hidden="true" />

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
            <Link href="#contact" className="btn-primary text-sm py-2 px-5 ms-2">
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
          <div className="flex items-center gap-2.5 mb-8">
            <div className="relative w-10 h-10 shrink-0">
              <div className="absolute inset-0 bg-primary rotate-45 rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-frank font-bold text-xs text-white relative z-10">TT</span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-frank font-bold text-secondary leading-none">TileTech</span>
              <span className="text-[10px] font-heebo text-gray-400 tracking-wide">ריצוף ושיפוץ</span>
            </div>
          </div>

          <nav aria-label="ניווט מובייל">
            <ul className="flex flex-col text-secondary font-heebo text-xl mb-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between hover:text-primary transition-colors py-3.5 border-b border-gray-100 group"
                    onClick={closeMenu}
                  >
                    {label}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
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
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
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
