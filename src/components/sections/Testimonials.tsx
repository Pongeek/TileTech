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

// ─── Google-style trust badge ─────────────────────────────────────────────────

const TrustBadge: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="inline-flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-full px-5 py-2.5 mb-8"
  >
    {/* Google G icon */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>

    <div className="flex items-center gap-2">
      <span className="text-secondary font-frank font-bold text-sm">4.9</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>
      <span className="text-secondary/50 text-xs font-assistant">מבוסס על Google Reviews</span>
    </div>
  </motion.div>
);

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
          <TrustBadge />

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
