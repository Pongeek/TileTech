'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, type PersonalInfoInputs } from '@/utils/validationSchemas';
import { useFormContext, FormStep } from '@/hooks/useFormContext';
import FormField from '@/components/ui/FormField';
import { motion, AnimatePresence } from 'framer-motion';

const PersonalInfoForm: React.FC = () => {
  const { nextStep, personalInfo, updateFormData } = useFormContext();
  
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<PersonalInfoInputs>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: personalInfo.firstName || '',
      lastName: personalInfo.lastName || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
    },
  });
  
  // Handle form submission
  const onSubmit = (data: PersonalInfoInputs) => {
    // Update form context data
    updateFormData('personalInfo', data);
    
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
        key="personal-info-form"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-frank font-bold text-secondary mb-6 text-center">
            פרטים אישיים
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name Field */}
            <FormField
              label="שם פרטי"
              name="firstName"
              required
              register={register}
              error={errors.firstName}
              type="text"
              placeholder="הכנס את שמך הפרטי"
              autoComplete="given-name"
            />
            
            {/* Last Name Field */}
            <FormField
              label="שם משפחה"
              name="lastName"
              required
              register={register}
              error={errors.lastName}
              type="text"
              placeholder="הכנס את שם המשפחה שלך"
              autoComplete="family-name"
            />
          </div>
          
          {/* Email Field */}
          <FormField
            label="דוא״ל"
            name="email"
            required
            register={register}
            error={errors.email}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
          />
          
          {/* Phone Field */}
          <FormField
            label="טלפון"
            name="phone"
            required
            register={register}
            error={errors.phone}
            type="tel"
            placeholder="05X-XXXXXXX"
            autoComplete="tel"
            inputMode="tel"
            dir="ltr"
          />
          
          {/* Navigation Buttons */}
          <div className="flex justify-end mt-8">
            <motion.button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting || (!isDirty && !isValid)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              המשך לפרטי הפרויקט
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalInfoForm; 