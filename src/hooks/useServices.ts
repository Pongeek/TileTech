'use client';

import { useState, useEffect } from 'react';
import servicesData from '@/data/services.json';

// Define types for service data
export interface Service {
  id: number;
  title: {
    he: string;
    en: string;
  };
  description: {
    he: string;
    en: string;
  };
  features: {
    he: string[];
    en: string[];
  };
  specialties: string[];
  images: {
    main: string;
    before: string;
    after: string;
  };
  icon: string;
}

interface UseServicesResult {
  services: Service[];
  loading: boolean;
  error: Error | null;
  selectedService: Service | null;
  selectService: (id: number | null) => void;
}

export const useServices = (): UseServicesResult => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    try {
      // In a real app, this might be an API call
      // For now, we're using the imported JSON directly
      setServices(servicesData as Service[]);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading services'));
      setLoading(false);
    }
  }, []);

  const selectService = (id: number | null) => {
    if (id === null) {
      setSelectedService(null);
      return;
    }
    
    const found = services.find(service => service.id === id);
    setSelectedService(found || null);
  };

  return {
    services,
    loading,
    error,
    selectedService,
    selectService
  };
};

// Helper function to get localized content
export const getLocalizedContent = (
  service: Service, 
  field: 'title' | 'description' | 'features',
  language: 'he' | 'en' = 'he'
): string | string[] => {
  if (!service) return '';
  
  return service[field][language];
}; 