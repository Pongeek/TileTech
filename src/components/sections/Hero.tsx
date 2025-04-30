'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Carousel slides with colors and text
const carouselSlides = [
  {
    bgColor: '#9CAF88',
    title: 'אריחים איכותיים לבית שלך',
    text: 'פתרונות ריצוף מותאמים אישית'
  },
  {
    bgColor: '#C66',
    title: 'עיצוב מטבחים וחדרי אמבטיה',
    text: 'חידוש ושדרוג חללי הבית'
  },
  {
    bgColor: '#964B00',
    title: 'עבודת פסיפס מקצועית',
    text: 'יצירת דוגמאות ייחודיות'
  },
  {
    bgColor: '#E5E5E0',
    title: 'התקנה ושירות מעולים',
    text: 'ליווי מקצועי לאורך כל הדרך',
    textColor: '#333' // Darker text for light background
  },
];

const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] min-h-[400px] overflow-hidden">
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
        dir="ltr" // Swiper works better with LTR direction
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background color */}
            <div 
              className="absolute inset-0 z-0" 
              style={{ backgroundColor: slide.bgColor }}
            >
              {/* Decorative tile pattern overlay */}
              <div className="absolute inset-0 opacity-10" 
                   style={{ 
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                     backgroundSize: '20px 20px'
                   }}>
              </div>
            </div>
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 z-5"></div>
            
            {/* Slide content */}
            <div className="absolute top-1/3 right-[10%] transform translate-y-[-50%] z-10 text-right">
              <h2 className={`text-3xl md:text-4xl font-frank font-bold mb-2 ${slide.textColor ? 'text-' + slide.textColor : 'text-white'}`}>
                {slide.title}
              </h2>
              <p className={`text-xl md:text-2xl font-heebo ${slide.textColor ? 'text-' + slide.textColor : 'text-white'}`}>
                {slide.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Hero Content Overlay */}
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
              href="#gallery" 
              className="bg-white text-secondary text-lg md:text-xl px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              צפה בעבודות שלנו
            </Link>
          </div>
        </div>
      </div>
      
      {/* Diagonal bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3 translate-y-8 z-10"></div>
    </section>
  );
};

export default Hero; 