'use client';

import React from 'react';
import { useFormContext, FormStep } from '@/hooks/useFormContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThankYouStep: React.FC = () => {
  const { resetForm } = useFormContext();
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5,
        type: 'spring',
        stiffness: 100 
      } 
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="thank-you-step"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
        className="text-center py-8"
      >
        <motion.div 
          className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-frank font-bold text-secondary mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          תודה שפנית אלינו!
        </motion.h2>
        
        <motion.div
          className="space-y-4 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="mb-2 font-assistant text-lg">פנייתך התקבלה בהצלחה!</p>
          <p className="font-assistant text-gray-600 mb-6">
            נציג שלנו יצור איתך קשר בהקדם האפשרי כדי לקבל פרטים נוספים ולתאם הצעת מחיר מותאמת אישית.
          </p>
          
          <div className="p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 mb-6 mx-auto max-w-sm">
            <p className="text-sm font-medium">זמן המענה הממוצע שלנו הוא עד 24 שעות בימי עסקים</p>
          </div>
          
          <motion.button
            onClick={resetForm}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md mt-4 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            שליחת פנייה נוספת
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThankYouStep; 