import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

// Floating UI — no SSR needed, don't affect layout or hydration
const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), { ssr: false });
const FloatingContactButton = dynamic(() => import('@/components/ui/FloatingContactButton'), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContactButton />
    </>
  );
}
