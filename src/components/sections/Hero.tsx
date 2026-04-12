'use client';

import React from 'react';
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
  return (
    <section className="relative h-[70vh] md:h-screen min-h-[560px] overflow-hidden mt-[-90px] pt-0">
      {/* Carousel */}
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="absolute inset-0 w-full h-full"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" style={{ zIndex: 5 }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero content — absolute so it layers above the Swiper */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="container-custom w-full pb-24 md:pb-32">
          <div className="max-w-3xl text-white">
            {/* Credibility badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="font-heebo text-sm font-medium">מעל 500 פרויקטים הושלמו בהצלחה</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-frank font-bold mb-5 leading-tight drop-shadow-lg">
              שירותי ריצוף ושיפוץ{' '}
              <span className="text-primary-light">מקצועיים</span>{' '}
              באיכות גבוהה
            </h1>
            <p className="text-lg md:text-xl font-heebo mb-8 text-white/90 max-w-2xl leading-relaxed">
              התקנת אריחים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית — ליווי מלא מהתכנון ועד הגמר.
            </p>
            <div className="flex flex-wrap gap-4">
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-white/60">
        <span className="font-heebo text-xs tracking-widest">גלול למטה</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
