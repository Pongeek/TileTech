'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const features: Feature[] = [
  {
    highlight: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L3.75 6v5.25c0 4.56 3.465 8.827 8.25 9.75 4.785-.923 8.25-5.19 8.25-9.75V6L12 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.25l2 2 4-4" />
      </svg>
    ),
    title: 'אחריות מלאה על העבודה',
    description: 'אנו מספקים אחריות מקיפה על כל עבודה שאנו מבצעים. לקוחותינו יכולים להיות בטוחים שכל ריצוף יעמוד במבחן הזמן.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <rect x="3" y="3" width="8" height="8" rx="0.75" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="3" width="8" height="8" rx="0.75" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="13" width="8" height="8" rx="0.75" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="13" width="8" height="8" rx="0.75" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 15.5l1.5 1.5 2.5-2.5" />
      </svg>
    ),
    title: 'חומרים באיכות פרמיום',
    description: 'אנו עובדים אך ורק עם חומרים ואריחים ממיטב הספקים. כל פרויקט מקבל את החומרים המתאימים ביותר לצרכיו ולסביבתו.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25l3.75-3.75 3 3 4.5-4.5 3 3L21 11.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 7.5v1.25m4-1.25v1.25m4-1.25v1.25m4-1.25v1.25m4-1.25v1.25" />
      </svg>
    ),
    title: 'ביצוע מהיר ומדויק',
    description: 'אנו מחויבים לעמוד בלוחות זמנים מוסכמים ולסיים כל עבודה ביעילות מרבית, מבלי לפגוע ולו במעט באיכות הסופית.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 0115 0" />
      </svg>
    ),
    title: 'ליווי אישי לאורך כל הדרך',
    description: 'מהתייעצות ראשונית ועד לגמר העבודה — אנו לצדכם בכל שלב. המומחים שלנו ישמחו לייעץ ולהכווין אתכם לבחירה הנכונה.',
  },
];

const WhyUs: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-20 bg-secondary overflow-hidden" dir="rtl" ref={ref}>
      <div className="container-custom">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-primary font-assistant font-semibold text-sm mb-2 tracking-widest uppercase">
            למה לבחור בנו
          </span>
          <h2 className="text-3xl md:text-4xl font-frank font-bold text-white mb-4">
            המחויבות שלנו לאיכות
          </h2>
          <div className="w-14 h-1 bg-primary mx-auto rounded-full mb-5" />
          <p className="font-assistant text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            בTileTech אנו מאמינים שכל פרויקט הוא הזדמנות לשנות מרחב ולהשאיר רושם. הנה מה שמייחד אותנו:
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative group rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:transform-none overflow-hidden
                ${feature.highlight
                  ? 'bg-primary/15 border-primary/40 hover:bg-primary/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Large background number */}
              <span className="absolute -left-2 -bottom-4 text-[7rem] font-frank font-bold leading-none select-none pointer-events-none text-white/[0.04]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex items-start gap-5 relative z-10">
                {/* Icon */}
                <div className={`shrink-0 w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                  ${feature.highlight
                    ? 'bg-primary text-white'
                    : 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}
                >
                  {feature.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  {/* Number badge */}
                  <span className="inline-block text-primary/60 font-frank font-bold text-xs mb-1 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-frank font-bold text-white mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="font-assistant text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Highlight card accent line */}
              {feature.highlight && (
                <div className="absolute top-0 right-0 bottom-0 w-1 bg-primary rounded-l-full" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
