'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  profileImage: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  featured: boolean;
  projectType: string;
}

interface UseTestimonialsReturn {
  testimonials: Testimonial[] | null;
  featuredTestimonials: Testimonial[] | null;
  loading: boolean;
  error: Error | null;
}

const useTestimonials = (): UseTestimonialsReturn => {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        
        // Fetch testimonials data from the API
        const response = await fetch('/api/testimonials');
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials data');
        }
        
        const data = await response.json();
        
        // Sort testimonials by date (newest first)
        const sortedTestimonials = data.sort((a: Testimonial, b: Testimonial) => {
          if (!a.date || !b.date) return 0;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        // Get featured testimonials
        const featured = sortedTestimonials.filter((testimonial: Testimonial) => testimonial.featured);
        
        setTestimonials(sortedTestimonials);
        setFeaturedTestimonials(featured);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  return { testimonials, featuredTestimonials, loading, error };
};

export default useTestimonials; 