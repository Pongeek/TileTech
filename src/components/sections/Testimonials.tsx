'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { useTestimonials } from '@/hooks';
import type { Swiper as SwiperType } from 'swiper';
import LazyLoad from '@/components/ui/LazyLoad';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Testimonials: React.FC = () => {
  const { testimonials, featuredTestimonials, loading, error } = useTestimonials();
  const [isWide, setIsWide] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Check window width for responsive layout decisions and reduced motion preferences
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsWide(window.innerWidth >= 1024);
      }
    };
    
    // Check for reduced motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    // Listen for changes in motion preference
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Set initial state
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  // Initialize custom navigation when swiper is available
  useEffect(() => {
    if (swiper && prevButtonRef.current && nextButtonRef.current) {
      // Set up navigation references
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevButtonRef.current;
        swiper.params.navigation.nextEl = nextButtonRef.current;
      }
      // Update swiper to use the custom navigation
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);
  
  // Create placeholder testimonials for loading state
  const placeholderTestimonials = Array(4).fill(null).map((_, index) => (
    <div key={`placeholder-${index}`} className="bg-white rounded-lg p-6 h-full shadow-md animate-pulse">
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
        <div className="flex flex-col">
          <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 mr-1 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  ));
  
  // Determine which effect to use based on reduced motion preferences
  const swiperEffect = prefersReducedMotion ? {} : { 
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  };
  
  // Configure auto-transition based on reduced motion preferences
  const autoplayConfig = prefersReducedMotion ? 
    false : 
    {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    };
  
  return (
    <motion.section 
      id="testimonials" 
      className="py-16 bg-gray-50" 
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" variants={headingVariants}>
          <h2 className="text-4xl font-frank font-bold text-secondary mb-4">מה הלקוחות אומרים</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 font-assistant">
            אנו גאים בשירות שאנו מספקים ובעבודה האיכותית שלנו. הנה מה שכמה מהלקוחות שלנו חושבים.
          </p>
        </motion.div>
        
        {/* Featured testimonials in carousel */}
        <motion.div 
          className="mb-10 relative"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
        >          
          {loading ? (
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              autoplay={autoplayConfig as any}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="testimonial-swiper"
            >
              {placeholderTestimonials.map((placeholder, index) => (
                <SwiperSlide key={`placeholder-slide-${index}`}>
                  {placeholder}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              שגיאה בטעינת ההמלצות. אנא נסו שנית מאוחר יותר.
            </div>
          ) : featuredTestimonials && featuredTestimonials.length > 0 ? (
            <div className="relative testimonial-container">
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  enabled: true
                }}
                pagination={{ clickable: true }}
                loop={featuredTestimonials.length > 3}
                autoplay={autoplayConfig as any}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 }
                }}
                dir="rtl"
                className="testimonial-swiper"
                onSwiper={setSwiper}
              >
                {featuredTestimonials.map((testimonial) => (
                  <SwiperSlide key={`featured-${testimonial.id}`}>
                    <div className="h-full">
                      <TestimonialCard {...testimonial} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Custom navigation buttons - with accessible labels */}
              <motion.div 
                ref={prevButtonRef}
                className="absolute top-1/2 right-1 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-opacity-100 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="הקודם"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </motion.div>
              <motion.div 
                ref={nextButtonRef}
                className="absolute top-1/2 left-1 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-opacity-100 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="הבא"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              אין המלצות להצגה כרגע.
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Add custom styles for Swiper and navigation */}
      <style jsx>{`
        :global(.testimonial-swiper .swiper-button-next),
        :global(.testimonial-swiper .swiper-button-prev) {
          display: none;
        }
        
        :global(.testimonial-container) {
          padding: 0 2rem;
        }
        
        :global(.testimonial-swiper .swiper-slide) {
          height: auto !important;
          display: flex !important;
        }
        
        :global(.testimonial-swiper .swiper-slide > div) {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        
        /* Fix for RTL layout and proper card spacing */
        :global(.testimonial-swiper.swiper-rtl .swiper-wrapper) {
          width: 100%;
          display: flex;
          flex-direction: row;
        }
        
        :global(.testimonial-swiper .swiper-pagination) {
          position: static;
          margin-top: 1.5rem;
        }
        
        /* Fade in/out transition for slides */
        :global(.swiper-fade .swiper-slide) {
          pointer-events: none;
          transition-property: opacity;
          transition-duration: 0.5s;
        }
        
        :global(.swiper-fade .swiper-slide-active) {
          pointer-events: auto;
        }
      `}</style>
    </motion.section>
  );
};

export default Testimonials; 