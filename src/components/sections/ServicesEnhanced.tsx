'use client';

import React, { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import ServiceCard from '@/components/ui/ServiceCard';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Button from '@/components/ui/Button';
import ScrollAnimated, { StaggerItem } from '@/components/ui/ScrollAnimated';
import { useFeedback, TOAST_TYPES } from '@/utils/feedback';

// Define the Service interface
interface Service {
  id: number;
  title: {
    he: string;
    en: string;
  };
  description: {
    he: string;
    en: string;
  };
  extendedDescription?: {
    he: string;
    en: string;
  };
  features: {
    he: string[];
    en: string[];
  };
  specialties: string[];
  icon: React.ReactNode;
  beforeAfterImages?: boolean;
  benefits?: {
    he: string[];
    en: string[];
  };
}

const ServicesEnhanced: React.FC = () => {
  const { services, getImageUrl } = useServices();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { showToast } = useFeedback();
  
  const handleServiceSelect = (id: number) => {
    setSelectedService(id);
    
    // Scroll to the showcase section smoothly
    document.getElementById('service-showcase')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    const serviceTitle = services.find((s: Service) => s.id === id)?.title.he || '';
    showToast(`בחרתם לעיין בשירות ${serviceTitle}`, TOAST_TYPES.INFO);
  };
  
  const selectedServiceData = services.find((service: Service) => service.id === selectedService) as Service | undefined;
  
  return (
    <section id="services" className="section bg-neutral-light py-16">
      <div className="container-custom">
        {/* Section Heading with Animation */}
        <ScrollAnimated
          type="fadeDown"
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">השירותים שלנו</h2>
          <p className="body-large max-w-3xl mx-auto">
            צוות המומחים שלנו מציע מגוון פתרונות התקנת אריחים עבור בתים, עסקים ומשרדים.
            אנו מתמחים במגוון סגנונות ותחומים, תוך שימוש בחומרים באיכות גבוהה ובטכניקות מתקדמות.
          </p>
        </ScrollAnimated>
        
        {/* Services Grid with Stagger Animation */}
        <ScrollAnimated
          type="stagger"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          threshold={0.05}
        >
          {services.map((service: Service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard
                id={service.id}
                title={service.title.he}
                description={service.description.he}
                features={service.features.he}
                specialties={service.specialties}
                imageUrl={getImageUrl(service, 'main')}
                icon={service.icon}
                onClick={() => handleServiceSelect(service.id)}
              />
            </StaggerItem>
          ))}
        </ScrollAnimated>
        
        {/* Service Showcase Section */}
        <div id="service-showcase" className="scroll-mt-24">
          {selectedServiceData ? (
            <ScrollAnimated type="fadeUp" className="bg-white rounded-xl shadow-elevation-2 overflow-hidden">
              <div className="p-8">
                <h3 className="heading-3 mb-6">{selectedServiceData.title.he}</h3>
                
                <ScrollAnimated type="fadeUp" delay={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="body-text mb-6">{selectedServiceData.extendedDescription?.he || selectedServiceData.description.he}</p>
                    
                    <ScrollAnimated type="stagger" className="mb-8">
                      <h4 className="heading-4 mb-4">יתרונות השירות:</h4>
                      <ul className="space-y-3">
                        {selectedServiceData.benefits?.he.map((benefit: string, index: number) => (
                          <StaggerItem key={index} className="flex items-start">
                            <span className="text-primary ml-3 mt-1">✓</span>
                            <span>{benefit}</span>
                          </StaggerItem>
                        ))}
                      </ul>
                    </ScrollAnimated>
                    
                    <ScrollAnimated type="fadeUp" delay={0.2}>
                      <Button
                        variant="primary"
                        href="#contact"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        }
                      >
                        קבלו הצעת מחיר
                      </Button>
                    </ScrollAnimated>
                  </div>
                  
                  <ScrollAnimated type="fadeUp" delay={0.3} className="overflow-hidden rounded-lg">
                    {selectedServiceData.beforeAfterImages ? (
                      <BeforeAfterSlider
                        beforeImage={getImageUrl(selectedServiceData, 'before')}
                        afterImage={getImageUrl(selectedServiceData, 'after')}
                        beforeLabel="לפני"
                        afterLabel="אחרי"
                      />
                    ) : (
                      <div className="aspect-video bg-neutral flex items-center justify-center rounded-lg overflow-hidden">
                        <img 
                          src={getImageUrl(selectedServiceData, 'main')} 
                          alt={selectedServiceData.title.he}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </ScrollAnimated>
                </ScrollAnimated>
              </div>
            </ScrollAnimated>
          ) : (
            <ScrollAnimated type="fadeIn" className="text-center py-10">
              <p className="body-large mb-4">בחרו שירות מהרשימה למעלה כדי לראות פרטים נוספים</p>
              <div className="animate-bounce-subtle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
              </div>
            </ScrollAnimated>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesEnhanced; 