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
      {/* Pre-mount placeholder */}
      {!mounted && <div className="absolute inset-0 z-0 bg-secondary" />}

      {/* Swiper carousel */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="w-full h-full hero-swiper"
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
                <div
                  suppressHydrationWarning
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10"
                  style={{ zIndex: 5 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Hero content */}
      <div className="absolute inset-0 z-20 flex items-end pointer-events-none">
        <div className="container-custom w-full pb-14 md:pb-28 pointer-events-auto">
          <div className="max-w-3xl text-white">

            {/* Single credibility badge — no Google */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="font-heebo text-sm font-medium">מעל 500 פרויקטים הושלמו בהצלחה</span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-frank font-bold mb-3 md:mb-5 leading-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
            >
              שירותי ריצוף ושיפוץ{' '}
              <span className="text-primary-light">מקצועיים</span>{' '}
              באיכות גבוהה
            </h1>

            <p
              className="hidden sm:block text-lg md:text-xl font-heebo mb-6 text-white/90 max-w-2xl leading-relaxed"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
            >
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

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-white/60 pointer-events-none">
        <span className="font-heebo text-xs tracking-widest">גלול למטה</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Hide Swiper nav arrows on mobile, show on md+ */}
      <style jsx global>{`
        .hero-swiper .swiper-button-prev,
        .hero-swiper .swiper-button-next {
          display: none;
        }
        @media (min-width: 768px) {
          .hero-swiper .swiper-button-prev,
          .hero-swiper .swiper-button-next {
            display: flex;
          }
        }
        .hero-swiper .swiper-button-prev,
        .hero-swiper .swiper-button-next {
          color: rgba(255,255,255,0.85);
        }
      `}</style>
    </section>
  );
};

export default Hero;
