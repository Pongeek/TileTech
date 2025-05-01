'use client';

import React, { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import { lazyLoad } from '@/utils/lazyLoad';

// Simple loading components
const ServicesSectionLoading = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  </div>
);

const ContactSectionLoading = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  </div>
);

// Lazy load below-the-fold components for better performance
const Services = lazyLoad(() => import('@/components/sections/Services'), {
  fallback: <ServicesSectionLoading />
});

// Use the optimized lazy-loaded version of Projects
const Projects = lazyLoad(() => import('@/components/sections/ProjectsLazy'), {
  fallback: (
    <div className="py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-frank font-bold text-secondary mb-4">הפרויקטים שלנו</h2>
          <div className="h-64 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    </div>
  )
});

const Testimonials = lazyLoad(() => import('@/components/sections/Testimonials'), {
  fallback: <ServicesSectionLoading />
});

const Contact = lazyLoad(() => import('@/components/sections/Contact'), {
  fallback: <ContactSectionLoading />
});

const ScrollToTop = lazyLoad(() => import('@/components/ui/ScrollToTop'), {
  fallback: null
});

const FloatingContactButton = lazyLoad(() => import('@/components/ui/FloatingContactButton'), {
  fallback: null
});

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <section id="hero" className="section">
          <Hero />
        </section>
        
        <section id="services" className="section py-16">
          <Services />
        </section>
        
        <section id="projects" className="section py-16">
          <Projects />
        </section>
        
        <section id="testimonials" className="section py-16">
          <Testimonials />
        </section>
        
        <section id="contact" className="section py-16">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContactButton />
    </>
  );
} 