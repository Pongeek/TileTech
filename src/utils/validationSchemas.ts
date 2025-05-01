import { z } from 'zod';

// Helper for common error messages in Hebrew
const errorMessages = {
  required: 'שדה חובה',
  email: 'אימייל לא תקין',
  minLength: (field: string, length: number) => `${field} חייב להכיל לפחות ${length} תווים`,
  phoneFormat: 'מספר טלפון לא תקין. הפורמט הנכון: 05X-XXXXXXX',
  date: 'תאריך לא תקין',
};

// Regex for Israeli phone number validation
const phoneRegex = /^05\d-?\d{7}$/;

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: errorMessages.minLength('שם פרטי', 2) }).trim(),
  lastName: z.string().min(2, { message: errorMessages.minLength('שם משפחה', 2) }).trim(),
  email: z.string().email({ message: errorMessages.email }).trim(),
  phone: z.string()
    .regex(phoneRegex, { message: errorMessages.phoneFormat })
    .trim(),
});

// Project types enum
export const projectTypes = [
  { id: 'residential', label: 'ריצוף ביתי' },
  { id: 'bathroom', label: 'חדרי אמבטיה' },
  { id: 'kitchen', label: 'מטבחים' },
  { id: 'mosaic', label: 'פסיפסים' },
  { id: 'commercial', label: 'מסחרי' },
  { id: 'other', label: 'אחר' },
] as const;

// Timeline options enum
export const timelineOptions = [
  { id: 'immediate', label: 'מיידי (תוך חודש)' },
  { id: 'soon', label: 'בקרוב (1-3 חודשים)' },
  { id: 'planning', label: 'בתכנון (3-6 חודשים)' },
  { id: 'future', label: 'בעתיד (6+ חודשים)' },
] as const;

// Step 2: Project Details Schema
export const projectDetailsSchema = z.object({
  projectType: z.enum(['residential', 'bathroom', 'kitchen', 'mosaic', 'commercial', 'other'] as const, {
    errorMap: () => ({ message: 'יש לבחור סוג פרויקט' }),
  }),
  projectScope: z.string()
    .min(10, { message: 'יש לתאר את הפרויקט בלפחות 10 תווים' })
    .max(500, { message: 'תיאור הפרויקט ארוך מדי (מקסימום 500 תווים)' })
    .trim(),
  timeline: z.enum(['immediate', 'soon', 'planning', 'future'] as const, {
    errorMap: () => ({ message: 'יש לבחור לוח זמנים' }),
  }),
  area: z.coerce.number({ 
    invalid_type_error: 'יש להזין מספר' 
  })
    .positive({ message: 'השטח חייב להיות מספר חיובי' })
    .optional()
    .or(z.literal('')),
  address: z.string().min(5, { message: 'יש להזין כתובת תקינה' }).optional(),
});

// Budget range options
export const budgetRanges = [
  { id: 'under10k', label: 'עד ₪10,000' },
  { id: '10k-30k', label: '₪10,000 - ₪30,000' },
  { id: '30k-50k', label: '₪30,000 - ₪50,000' },
  { id: '50k-100k', label: '₪50,000 - ₪100,000' },
  { id: 'over100k', label: 'מעל ₪100,000' },
  { id: 'unknown', label: 'לא יודע / תלוי בהצעת המחיר' },
] as const;

// How did you hear about us options
export const referralOptions = [
  { id: 'search', label: 'חיפוש באינטרנט' },
  { id: 'social', label: 'מדיה חברתית' },
  { id: 'friend', label: 'חבר / מכר' },
  { id: 'previous', label: 'לקוח חוזר' },
  { id: 'other', label: 'אחר' },
] as const;

// Step 3: Budget and Additional Info Schema
export const budgetInfoSchema = z.object({
  budget: z.enum(['under10k', '10k-30k', '30k-50k', '50k-100k', 'over100k', 'unknown'] as const, {
    errorMap: () => ({ message: 'יש לבחור טווח תקציב' }),
  }),
  additionalInfo: z.string()
    .max(1000, { message: 'המידע ארוך מדי (מקסימום 1000 תווים)' })
    .optional()
    .or(z.literal('')),
  referralSource: z.enum(['search', 'social', 'friend', 'previous', 'other'] as const, {
    errorMap: () => ({ message: 'יש לבחור כיצד שמעת עלינו' }),
  }),
  preferredContact: z.enum(['email', 'phone', 'whatsapp'] as const, {
    errorMap: () => ({ message: 'יש לבחור דרך התקשרות מועדפת' }),
  }),
  receiveUpdates: z.boolean().default(false),
});

// Combined schema for the full form
export const fullFormSchema = personalInfoSchema.merge(projectDetailsSchema).merge(budgetInfoSchema);

// Type for the entire form
export type QuoteFormData = z.infer<typeof fullFormSchema>;

// Types for each step
export type PersonalInfoInputs = z.infer<typeof personalInfoSchema>;
export type ProjectDetailsInputs = z.infer<typeof projectDetailsSchema>;
export type BudgetInfoInputs = z.infer<typeof budgetInfoSchema>; 