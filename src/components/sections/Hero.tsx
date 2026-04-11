'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const carouselSlides = [
  {
    bgColor: '#9CAF88',
    image: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/e_improve,e_sharpen/v1746408868/tiletech/photos/living_room_hero_d4lzsl.jpg',
  },
  {
    bgColor: '#C66',
    image: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/c_crop,ar_16:9,e_improve,e_sharpen/v1746410803/shower_room_3_nrwacn.png',
  },
  {
    bgColor: '#964B00',
    image: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/b_rgb:FFFFFF/e_improve,e_sharpen/v1746410770/image_fx_quxwiw.png',
  },
  {
    bgColor: '#E5E5E0',
    image: 'https://res.cloudinary.com/dyxjbqvwz/image/upload/c_crop,ar_16:9,e_improve,e_sharpen/v1746412519/Kitchen_hero3_luuylv.png',
  },
];

const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[85vh] min-h-[480px] overflow-hidden mt-[-90px] pt-0">
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
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  quality={90}
                />
              </div>
            ) : (
              <div className="absolute inset-0 z-0" style={{ backgroundColor: slide.bgColor }} />
            )}
            {/* Gradient overlay — dark at bottom for text legibility, lighter at top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 z-5" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero content */}
      <div className="container-custom relative z-20 h-full flex items-center">
        <div className="max-w-3xl text-white">
          {/* Credibility badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="font-heebo text-sm font-medium">מעל 500 פרויקטים הושלמו בהצלחה</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-frank font-bold mb-5 leading-tight drop-shadow-lg">
            שירותי ריצוף ושיפוץ{' '}
            <span className="text-primary">מקצועיים</span>{' '}
            באיכות גבוהה
          </h1>
          <p className="text-lg md:text-xl font-heebo mb-8 text-white/90 max-w-2xl leading-relaxed">
            התקנת אריחים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית — ליווי מלא מהתכנון ועד הגמר.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="btn-primary text-lg px-8 py-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              קבל הצעת מחיר חינם
            </Link>
            <Link
              href="#projects"
              className="bg-white/15 backdrop-blur-sm border border-white/40 text-white text-lg px-8 py-4 rounded-lg font-semibold font-heebo hover:bg-white/25 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              צפה בעבודות שלנו
            </Link>
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

      {/* Diagonal bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3 translate-y-8 z-10" />
    </section>
  );
};

export default Hero;
