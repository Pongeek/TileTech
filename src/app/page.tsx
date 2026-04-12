'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import WhyUs from '@/components/sections/WhyUs';
import { lazyLoad } from '@/utils/lazyLoad';

// Use the optimized lazy-loaded section components
const Services = lazyLoad(() => import('@/components/sections/ServicesLazy'), {
  fallback: (
    <div className="py-16">
      <div className="container-custom">
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
    <div className="py-16 bg-cream">
      <div className="container-custom">
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
    <div className="py-16 bg-neutral-light">
      <div className="container-custom">
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
    <div className="py-16 bg-cream">
      <div className="container-custom">
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
        {/* Hero — full bleed, no padding */}
        <section id="hero" className="scroll-mt-16">
          <Hero />
        </section>

        {/* Stats band */}
        <Stats />

        {/* Services — white background */}
        <section id="services" className="scroll-mt-16 bg-white py-20">
          <Services />
        </section>

        {/* Why Us — cream background for contrast */}
        <WhyUs />

        {/* Projects — slightly darker cream */}
        <section id="projects" className="scroll-mt-16 bg-neutral-light py-0">
          <Projects />
        </section>

        {/* Testimonials — white */}
        <section id="testimonials" className="scroll-mt-16 bg-white py-0">
          <Testimonials />
        </section>

        {/* Contact — cream */}
        <section id="contact" className="scroll-mt-16 bg-cream py-0">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContactButton />
    </>
  );
}
