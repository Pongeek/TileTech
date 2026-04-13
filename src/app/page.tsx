'use client'; // v2

import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';

// Import actual components directly with dynamic — avoids double-wrapping the *Lazy files
const Services = dynamic(() => import('@/components/sections/ServicesEnhanced'), {
  ssr: false,
  loading: () => (
    <div className="py-16">
      <div className="container-custom text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  )
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  ssr: false,
  loading: () => (
    <div className="py-16 bg-neutral-light">
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

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  ssr: false,
  loading: () => (
    <div className="py-16">
      <div className="container-custom text-center mb-12">
        <div className="h-10 w-56 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  )
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  ssr: false,
  loading: () => (
    <div className="py-16 bg-cream">
      <div className="container-custom text-center mb-12">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  )
});

const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), { ssr: false });
const FloatingContactButton = dynamic(() => import('@/components/ui/FloatingContactButton'), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />

        <section id="services" className="scroll-mt-16 bg-white py-20">
          <Services />
        </section>

        <WhyUs />

        <section id="projects" className="scroll-mt-16 bg-neutral-light py-0">
          <Projects />
        </section>

        <section id="testimonials" className="scroll-mt-16 bg-white py-0">
          <Testimonials />
        </section>

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
