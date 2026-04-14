'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Button from '@/components/ui/Button';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const carouselSlides = [
  {
    bgColor: '#9CAF88',
    image:
      'https://res.cloudinary.com/dyxjbqvwz/image/upload/e_improve,e_sharpen/v1746408868/tiletech/photos/living_room_hero_d4lzsl.jpg',
    alt: 'סלון מרוצף באריחים — דוגמה לעבודת ריצוף בבית פרטי',
  },
  {
    bgColor: '#B5714A',
    image:
      'https://res.cloudinary.com/dyxjbqvwz/image/upload/c_crop,ar_16:9,e_improve,e_sharpen/v1746410803/shower_room_3_nrwacn.png',
    alt: 'מקלחון מעוצב עם אריחים — שיפוץ חדר רחצה',
  },
  {
    bgColor: '#E6DFD4',
    image:
      'https://res.cloudinary.com/dyxjbqvwz/image/upload/b_rgb:FFFFFF/e_improve,e_sharpen/v1746410770/image_fx_quxwiw.png',
    alt: 'פרטי ריצוף וחיפוי איכותיים — עבודת TileTech',
  },
  {
    bgColor: '#E5E5E0',
    image:
      'https://res.cloudinary.com/dyxjbqvwz/image/upload/c_crop,ar_16:9,e_improve,e_sharpen/v1746412519/Kitchen_hero3_luuylv.png',
    alt: 'מטבח מרוצף ומחופה באריחים — שיפוץ מטבח',
  },
];

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="hero" className="scroll-mt-16 relative h-[55vh] md:h-[70vh] min-h-[480px] overflow-hidden mt-[-90px] pt-0">
      {/* Pre-mount placeholder — simple dark bg, identical on server and client */}
      {!mounted && (
        <div className="absolute inset-0 z-0 bg-secondary" />
      )}
      {/* Swiper wrapper div — we control absolute positioning here since swiper.css forces position:relative on .swiper itself */}
      {mounted && <div className="absolute inset-0 z-0"><Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-full"
        dir="ltr"
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {slide.image ? (
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  quality={90}
                />
              </div>
            ) : (
              <div className="absolute inset-0 z-0" style={{ backgroundColor: slide.bgColor }} />
            )}
            {/* Gradient overlay — strong at bottom for text legibility */}
            {/* suppressHydrationWarning: Swiper's EffectFade adds z-5 class on client init */}
            <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" style={{ zIndex: 5 }} />
          </SwiperSlide>
        ))}
      </Swiper></div>}

      {/* Hero content — pointer-events-none so Swiper navigation arrows remain clickable */}
      <div className="absolute inset-0 z-20 flex items-end pointer-events-none">
        <div className="container-custom w-full pb-24 md:pb-32 pointer-events-auto">
          <div className="max-w-3xl text-white">
            {/* Credibility badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {/* Projects count */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="font-heebo text-sm font-medium">מעל 500 פרויקטים הושלמו</span>
              </div>
              {/* Google rating */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-heebo text-sm font-bold">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-frank font-bold mb-5 leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
              שירותי ריצוף ושיפוץ{' '}
              <span className="text-primary-light">מקצועיים</span>{' '}
              באיכות גבוהה
            </h1>
            <p className="text-lg md:text-xl font-heebo mb-8 text-white/90 max-w-2xl leading-relaxed" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
              התקנת אריחים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית — ליווי מלא מהתכנון ועד הגמר.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="#contact"
                variant="primary"
                size="large"
                className="hover:shadow-xl hover:-translate-y-1 motion-reduce:hover:transform-none shadow-lg"
              >
                קבל הצעת מחיר חינם
              </Button>
              <Button
                href="#projects"
                variant="glass"
                size="large"
                className="hover:-translate-y-1 motion-reduce:hover:transform-none"
              >
                צפה בעבודות שלנו
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-white/60 pointer-events-none">
        <span className="font-heebo text-xs tracking-widest">גלול למטה</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
