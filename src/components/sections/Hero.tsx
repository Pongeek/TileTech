'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
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
    <section className="relative h-[60vh] md:h-[80vh] min-h-[400px] overflow-hidden mt-[-90px] pt-0">
      {/* Carousel */}
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="absolute inset-0 w-full h-full"
        dir="ltr"
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background */}
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
              <div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: slide.bgColor }}
              />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45 z-5" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero content — single, centred message over all slides */}
      <div className="container-custom relative z-20 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-frank font-bold mb-6 drop-shadow-lg">
            שירותי התקנת אריחים מקצועיים באיכות גבוהה
          </h1>
          <p className="text-xl md:text-2xl font-heebo mb-8 drop-shadow-md">
            המומחים שלנו בTileTech מספקים שירותי התקנת אריחים, שיפוץ מטבחים וחדרי אמבטיה, ועבודות פסיפס מותאמות אישית באיכות הגבוהה ביותר.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="btn-primary text-lg md:text-xl px-8 py-4 hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              קבל הצעת מחיר
            </Link>
            <Link
              href="#projects"
              className="bg-white text-secondary text-lg md:text-xl px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              צפה בעבודות שלנו
            </Link>
          </div>
        </div>
      </div>

      {/* Diagonal bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3 translate-y-8 z-10" />
    </section>
  );
};

export default Hero;
