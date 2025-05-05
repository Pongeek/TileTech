'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  projectDetailsSchema, 
  type ProjectDetailsInputs,
  projectTypes,
  timelineOptions
} from '@/utils/validationSchemas';
import { useFormContext, FormStep } from '@/hooks/useFormContext';
import FormField from '@/components/ui/FormField';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsEvents } from '@/utils/analytics';

const ProjectDetailsForm: React.FC = () => {
  const { nextStep, prevStep, projectDetails, updateFormData } = useFormContext();
  
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<ProjectDetailsInputs>({
    resolver: zodResolver(projectDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      projectType: projectDetails.projectType || 'residential',
      projectScope: projectDetails.projectScope || '',
      timeline: projectDetails.timeline || 'soon',
      area: projectDetails.area || '',
      address: projectDetails.address || '',
    },
  });
  
  // Handle form submission
  const onSubmit = (data: ProjectDetailsInputs) => {
    // Update form context data
    updateFormData('projectDetails', data);
    
    // Track form step (step 2)
    AnalyticsEvents.formStep('quote', 2);
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
        key="project-details-form"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-frank font-bold text-secondary mb-6 text-center">
            פרטי הפרויקט
          </h2>
          
          {/* Project Type Field */}
          <FormField
            label="סוג הפרויקט"
            name="projectType"
            required
            register={register}
            error={errors.projectType}
            type="select"
          >
            {projectTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </FormField>
          
          {/* Project Scope Field */}
          <FormField
            label="תיאור הפרויקט"
            name="projectScope"
            required
            register={register}
            error={errors.projectScope}
            type="textarea"
            placeholder="תאר את הפרויקט שלך, כולל פרטים חשובים כמו סוג האריחים, גודל השטח, דרישות מיוחדות, וכו׳"
            rows={4}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline Field */}
            <FormField
              label="לוח זמנים משוער"
              name="timeline"
              required
              register={register}
              error={errors.timeline}
              type="select"
            >
              {timelineOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </FormField>
            
            {/* Area Field */}
            <FormField
              label="שטח במ״ר (אופציונלי)"
              name="area"
              register={register}
              error={errors.area}
              type="number"
              placeholder="100"
              inputMode="numeric"
              min={1}
              dir="ltr"
            />
          </div>
          
          {/* Address Field */}
          <FormField
            label="כתובת הפרויקט (אופציונלי)"
            name="address"
            register={register}
            error={errors.address}
            type="text"
            placeholder="רחוב, עיר"
            autoComplete="street-address"
          />
          
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
              המשך לפרטים נוספים
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7 " />
              </svg>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailsForm; 