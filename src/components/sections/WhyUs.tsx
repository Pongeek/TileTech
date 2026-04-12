'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: (
      // Shield with tile pattern — warranty
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L3.75 6v5.25c0 4.56 3.465 8.827 8.25 9.75 4.785-.923 8.25-5.19 8.25-9.75V6L12 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.25l2 2 4-4" />
      </svg>
    ),
    title: 'אחריות מלאה על העבודה',
    description: 'אנו מספקים אחריות מקיפה על כל עבודה שאנו מבצעים. לקוחותינו יכולים להיות בטוחים שכל ריצוף יעמוד במבחן הזמן.',
  },
  {
    icon: (
      // Stacked tiles — premium materials
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
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
      // Ruler + level — precise fast execution
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25l3.75-3.75 3 3 4.5-4.5 3 3L21 11.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 7.5v1.25m4-1.25v1.25m4-1.25v1.25m4-1.25v1.25m4-1.25v1.25" />
      </svg>
    ),
    title: 'ביצוע מהיר ומדויק',
    description: 'אנו מחויבים לעמוד בלוחות זמנים מוסכמים ולסיים כל עבודה ביעילות מרבית, מבלי לפגוע ולו במעט באיכות הסופית.',
  },
  {
    icon: (
      // Person + tile — personal guidance
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 0110.5-7.938" />
        <rect x="13.5" y="13.5" width="4" height="4" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="17.5" y="13.5" width="4" height="4" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13.5" y="17.5" width="4" height="4" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="17.5" y="17.5" width="4" height="4" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <section className="py-20 bg-secondary" dir="rtl" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: -15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow="למה לבחור בנו"
            title="המחויבות שלנו לאיכות"
            description="בTileTech אנו מאמינים שכל פרויקט הוא הזדמנות לשנות מרחב ולהשאיר רושם. הנה מה שמייחד אותנו:"
            accentBar
            eyebrowUppercase
            invertColors
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-7 hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1 motion-reduce:hover:transform-none"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-frank font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="font-assistant text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
