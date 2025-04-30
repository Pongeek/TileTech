'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { useTestimonials } from '@/hooks';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials: React.FC = () => {
  const { testimonials, featuredTestimonials, loading, error } = useTestimonials();
  const [isWide, setIsWide] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Check window width for responsive layout decisions
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsWide(window.innerWidth >= 1024);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
  
  return (
    <section id="testimonials" className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-frank font-bold text-secondary mb-4">מה הלקוחות אומרים</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 font-assistant">
            אנו גאים בשירות שאנו מספקים ובעבודה האיכותית שלנו. הנה מה שכמה מהלקוחות שלנו חושבים.
          </p>
        </div>
        
        {/* Featured testimonials in carousel */}
        <div className="mb-10">
          <h3 className="text-2xl font-frank font-bold text-center mb-6">המלצות מובחרות</h3>
          
          {loading ? (
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
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
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={featuredTestimonials.length > 3}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="testimonial-swiper"
            >
              {featuredTestimonials.map((testimonial) => (
                <SwiperSlide key={`featured-${testimonial.id}`}>
                  <div className="h-full">
                    <TestimonialCard {...testimonial} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-8 text-gray-500">
              אין המלצות מובחרות להצגה כרגע.
            </div>
          )}
        </div>
        
        {/* All testimonials in grid */}
        <div>
          <h3 className="text-2xl font-frank font-bold text-center mb-6">כל ההמלצות</h3>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderTestimonials}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              שגיאה בטעינת ההמלצות. אנא נסו שנית מאוחר יותר.
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 % 0.5 // stagger effect
                  }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              אין המלצות להצגה כרגע.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 