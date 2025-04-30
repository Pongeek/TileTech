'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import ScrollToTop from '@/components/ui/ScrollToTop';
import dynamic from 'next/dynamic';

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
    </>
  );
} 