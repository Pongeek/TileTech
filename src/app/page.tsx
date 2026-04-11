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

        <Stats />

        {/* Wave: secondary → white */}
        <div className="relative h-12 overflow-hidden -mt-1 bg-white">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#964B00" />
          </svg>
        </div>

        <section id="services" className="section py-16">
          <Services />
        </section>

        {/* Wave: white → neutral-light */}
        <div className="relative h-12 overflow-hidden -mt-1 bg-[#F0F0EB]">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#ffffff" />
          </svg>
        </div>

        <WhyUs />

        {/* Wave: neutral-light → white */}
        <div className="relative h-12 overflow-hidden -mt-1 bg-white">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#F0F0EB" />
          </svg>
        </div>

        <section id="projects" className="section py-0">
          <Projects />
        </section>

        {/* Wave: white → neutral-light */}
        <div className="relative h-12 overflow-hidden -mt-1 bg-[#F0F0EB]">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#ffffff" />
          </svg>
        </div>

        <section id="testimonials" className="section py-0">
          <Testimonials />
        </section>

        {/* Wave: neutral-light → neutral */}
        <div className="relative h-12 overflow-hidden -mt-1 bg-[#E5E5E0]">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#F0F0EB" />
          </svg>
        </div>

        <section id="contact" className="section py-0">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContactButton />
    </>
  );
} 