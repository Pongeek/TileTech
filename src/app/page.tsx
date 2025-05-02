'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import { lazyLoad } from '@/utils/lazyLoad';

// Use the optimized lazy-loaded section components
const Services = lazyLoad(() => import('@/components/sections/ServicesLazy'), {
  fallback: (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  )
});

const Projects = lazyLoad(() => import('@/components/sections/ProjectsLazy'), {
  fallback: (
    <div className="py-16 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="h-64 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  )
});

const Testimonials = lazyLoad(() => import('@/components/sections/TestimonialsLazy'), {
  fallback: (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-56 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  )
});

const Contact = lazyLoad(() => import('@/components/sections/ContactLazy'), {
  fallback: (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  )
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