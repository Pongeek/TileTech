'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import StarRating from '@/components/ui/StarRating';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  featured: boolean;
  projectType?: string;
}

const projectLabels: Record<string, string> = {
  residential: 'ריצוף ביתי',
  bathroom: 'חדר אמבטיה',
  kitchen: 'מטבח',
  commercial: 'מסחרי',
};

// Avatar colors cycling through warm palette
const avatarColors = [
  'bg-primary text-white',
  'bg-amber-600 text-white',
  'bg-stone-600 text-white',
  'bg-orange-700 text-white',
  'bg-rose-700 text-white',
  'bg-yellow-700 text-white',
];

// Hardcoded featured testimonials (from data/testimonials.json featured:true)
const FEATURED: Testimonial[] = [
  {
    id: 1,
    name: 'יוסי כהן',
    location: 'תל אביב',
    rating: 5,
    text: 'עבודה מקצועית ואיכותית. התהליך היה חלק מאוד, והתוצאה הסופית עלתה על כל הציפיות שלנו! הריצוף בסלון שלנו מושלם. אני ממליץ בחום לכל מי שמחפש אנשי מקצוע אמינים.',
    date: '2023-12-15',
    featured: true,
    projectType: 'residential',
  },
  {
    id: 3,
    name: 'משה אברהמי',
    location: 'ירושלים',
    rating: 5,
    text: 'הזמנתי עבודת פסיפס מורכבת למטבח החדש שלנו והתוצאה פשוט מרהיבה! האריחים מותאמים בצורה מושלמת והעיצוב בדיוק כפי שדמיינתי. ללא ספק אחת ההחלטות הטובות ביותר שעשיתי בתהליך השיפוץ.',
    date: '2023-10-20',
    featured: true,
    projectType: 'kitchen',
  },
  {
    id: 5,
    name: 'עמית גולן',
    location: 'ראשון לציון',
    rating: 5,
    text: 'שיפצנו את המשרדים שלנו והתוצאה מעולה! הריצוף החדש שדרג את המראה של החלל בצורה דרמטית. העבודה הייתה מהירה וההפרעה לפעילות העסקית הייתה מינימלית. מומלץ בחום!',
    date: '2023-08-12',
    featured: true,
    projectType: 'commercial',
  },
  {
    id: 7,
    name: 'אלון מזרחי',
    location: 'הרצליה',
    rating: 5,
    text: 'הזמנתי עבודת פסיפס לקיר בבית הקפה שלי והתוצאה מדהימה! הדיוק בעבודה והיצירתיות בביצוע היו מעל ומעבר למה שציפיתי. הלקוחות שלי לא מפסיקים להתפעל מהעיצוב החדש.',
    date: '2023-06-22',
    featured: true,
    projectType: 'commercial',
  },
  {
    id: 9,
    name: 'איתי לויט',
    location: 'מודיעין',
    rating: 5,
    text: 'התקנתי אריחים מעוצבים בחדר המגורים ובחדר השינה וזה פשוט יצא מושלם! העבודה הייתה מדויקת, נקייה ובמחיר הוגן. אמליץ עליכם לכל חבריי!',
    date: '2023-04-10',
    featured: true,
    projectType: 'residential',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const TestimonialCard: React.FC<{ t: Testimonial; colorClass: string }> = ({ t, colorClass }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.text.length > 160;
  const display = expanded || !isLong ? t.text : `${t.text.slice(0, 160)}…`;
  const initial = t.name.charAt(0);

  return (
    <div className="h-full flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Large quote */}
      <span className="text-5xl font-serif leading-none text-primary/20 select-none mb-2" aria-hidden>❝</span>

      {/* Text */}
      <p className="text-secondary/70 font-assistant text-sm leading-relaxed flex-1 mb-3">
        {display}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-primary hover:text-primary/80 text-xs font-assistant font-medium mb-4 self-start transition-colors"
        >
          {expanded ? 'הצג פחות' : 'קרא עוד'}
        </button>
      )}

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-4" />

      {/* Footer */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-frank font-bold text-sm ${colorClass}`}>
          {initial}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-frank font-bold text-secondary text-sm truncate">{t.name}</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-secondary/40 text-xs">{t.location}</span>
            {t.projectType && (
              <>
                <span className="text-secondary/30 text-xs">·</span>
                <span className="text-primary/80 text-xs font-assistant">{projectLabels[t.projectType] ?? t.projectType}</span>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <StarRating rating={t.rating} size="sm" />
        </div>
      </div>
    </div>
  );
};


// ─── Main section ─────────────────────────────────────────────────────────────

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [_swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 bg-neutral-light overflow-hidden"
      dir="rtl"
    >
      {/* Subtle terracotta glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-frank font-bold text-sm uppercase tracking-widest mb-3"
          >
            המלצות
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl md:text-4xl font-frank font-bold text-secondary mb-4"
          >
            מה הלקוחות אומרים
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-secondary/55 font-assistant text-base max-w-xl mx-auto"
          >
            אנו גאים בשירות שאנו מספקים ובעבודה האיכותית שלנו
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12 relative px-2"
        >
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              clickable: true,
              bulletClass: 'testimonial-bullet',
              bulletActiveClass: 'testimonial-bullet-active',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            dir="rtl"
            className="testimonial-swiper pb-10"
            onSwiper={setSwiper}
          >
            {FEATURED.map((t, i) => (
              <SwiperSlide key={t.id} className="h-auto">
                <TestimonialCard t={t} colorClass={avatarColors[i % avatarColors.length]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Swiper pagination dot styles */}
      <style jsx global>{`
        .testimonial-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(46,42,38,0.18);
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .testimonial-bullet-active {
          background: #B5714A;
          width: 24px;
        }
        .testimonial-swiper .swiper-pagination {
          position: static;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
        }
        .testimonial-swiper .swiper-slide {
          height: auto !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
