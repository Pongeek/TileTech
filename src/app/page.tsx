'use client';

import React, { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import dynamic from 'next/dynamic';

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

// Dynamically import components that are below the fold
const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <ServicesSectionLoading />
});

// Dynamically import the Projects component to avoid hydration errors
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  ssr: false,
  loading: () => (
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

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <ServicesSectionLoading />
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <ContactSectionLoading />
});

const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), {
  ssr: false
});

const FloatingContactButton = dynamic(() => import('@/components/ui/FloatingContactButton'), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <section id="hero" className="section">
          <Hero />
        </section>
        
        <Suspense fallback={<ServicesSectionLoading />}>
          <Services />
        </Suspense>
        
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