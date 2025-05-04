'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  budgetInfoSchema, 
  type BudgetInfoInputs,
  budgetRanges,
  referralOptions
} from '@/utils/validationSchemas';
import { useFormContext } from '@/hooks/useFormContext';
import FormField from '@/components/ui/FormField';
import { motion, AnimatePresence } from 'framer-motion';

const BudgetInfoForm: React.FC = () => {
  const { nextStep, prevStep, budgetInfo, updateFormData } = useFormContext();
  
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<BudgetInfoInputs>({
    resolver: zodResolver(budgetInfoSchema) as any, // Type assertion to work around the type mismatch temporarily
    mode: 'onChange',
    defaultValues: {
      budget: budgetInfo.budget || 'unknown',
      additionalInfo: budgetInfo.additionalInfo || '',
      referralSource: budgetInfo.referralSource || 'search',
      preferredContact: budgetInfo.preferredContact || 'phone',
      receiveUpdates: budgetInfo.receiveUpdates ?? false,
    },
  });
  
  // Handle form submission
  const onSubmit = (data: BudgetInfoInputs) => {
    // Update form context data
    updateFormData('budgetInfo', data);
    
    // Move to next step
    nextStep();
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="budget-info-form"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-frank font-bold text-secondary mb-6 text-center">
            תקציב ומידע נוסף
          </h2>
          
          {/* Budget Range Field */}
          <FormField
            label="טווח תקציב"
            name="budget"
            required
            register={register}
            error={errors.budget}
            type="select"
          >
            {budgetRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </FormField>
          
          {/* Referral Source Field */}
          <FormField
            label="איך שמעת עלינו?"
            name="referralSource"
            required
            register={register}
            error={errors.referralSource}
            type="select"
          >
            {referralOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </FormField>
          
          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">דרך התקשרות מועדפת *</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input 
                  type="radio"
                  value="phone"
                  {...register('preferredContact')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="mr-2">טלפון</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="radio"
                  value="email"
                  {...register('preferredContact')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="mr-2">אימייל</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="radio"
                  value="whatsapp"
                  {...register('preferredContact')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="mr-2">וואטסאפ</span>
              </label>
            </div>
            {errors.preferredContact && (
              <p className="text-sm text-red-600 mt-1">{errors.preferredContact.message}</p>
            )}
          </div>
          
          {/* Additional Information Field */}
          <FormField
            label="מידע נוסף (אופציונלי)"
            name="additionalInfo"
            register={register}
            error={errors.additionalInfo}
            type="textarea"
            placeholder="כל מידע נוסף שתרצה לשתף איתנו"
            rows={3}
          />
          
          {/* Receive Updates Checkbox */}
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="receiveUpdates"
                type="checkbox"
                {...register('receiveUpdates')}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </div>
            <div className="mr-3 text-sm">
              <label htmlFor="receiveUpdates" className="text-gray-700">
                אני מעוניין לקבל עדכונים ומבצעים בדוא״ל
              </label>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              type="button"
              onClick={prevStep}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              חזרה
            </motion.button>
            
            <motion.button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting || (!isDirty && !isValid)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              המשך לסיכום
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              
            </motion.button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default BudgetInfoForm; 