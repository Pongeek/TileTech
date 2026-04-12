'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useServices, Service } from '@/hooks/useServices';
import ServiceCard from '@/components/ui/ServiceCard';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Button from '@/components/ui/Button';
import ScrollAnimated, { StaggerItem } from '@/components/ui/ScrollAnimated';
import { useFeedback, TOAST_TYPES } from '@/utils/feedback';

interface ExtendedService extends Omit<Service, 'icon'> {
  icon: React.ReactNode | string;
  extendedDescription?: { he: string; en: string };
  beforeAfterImages?: boolean;
  benefits?: { he: string[]; en: string[] };
}

const ServicesEnhanced: React.FC = () => {
  const { services, getImageUrl } = useServices();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const feedback = useFeedback();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const servicesData = services || [];

  const handleServiceSelect = (id: number) => {
    setSelectedService(id);
    document.getElementById('service-showcase')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const serviceTitle = servicesData.find((s) => s.id === id)?.title.he || '';
    feedback.showToast(`בחרתם לעיין בשירות ${serviceTitle}`, TOAST_TYPES.INFO);
  };

  const selectedServiceData = servicesData.find((s) => s.id === selectedService) as ExtendedService | undefined;

  return (
    <section id="services" ref={sectionRef} className="scroll-mt-16 bg-white py-0">
      <div className="container-custom">
        {/* Section header — consistent with WhyUs / Testimonials */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-primary font-assistant font-semibold text-base mb-2 tracking-wide uppercase">
            מה אנחנו עושים
          </span>
          <h2 className="text-3xl md:text-4xl font-frank font-bold text-secondary mb-4">
            השירותים שלנו
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-5" />
          <p className="text-lg font-assistant text-gray-600 max-w-2xl mx-auto">
            צוות המומחים שלנו מציע מגוון פתרונות התקנת אריחים עבור בתים, עסקים ומשרדים —
            תוך שימוש בחומרים באיכות גבוהה ובטכניקות מתקדמות.
          </p>
        </motion.div>

        {/* Services grid */}
        <ScrollAnimated
          type="stagger"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          threshold={0.05}
        >
          {servicesData.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard
                id={service.id}
                title={service.title.he}
                description={service.description.he}
                features={service.features.he}
                specialties={service.specialties}
                imageUrl={getImageUrl ? getImageUrl(service, 'main') : ''}
                icon={service.icon}
                isSelected={selectedService === service.id}
                onClick={() => handleServiceSelect(service.id)}
              />
            </StaggerItem>
          ))}
        </ScrollAnimated>

        {/* Service showcase */}
        <div id="service-showcase" className="scroll-mt-24">
          {selectedServiceData ? (
            <ScrollAnimated type="fadeUp" className="bg-white rounded-2xl shadow-elevation-2 border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-frank font-bold text-secondary mb-6">{selectedServiceData.title.he}</h3>

                <ScrollAnimated type="fadeUp" delay={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="font-assistant text-gray-600 leading-relaxed mb-6">
                      {selectedServiceData.extendedDescription?.he || selectedServiceData.description.he}
                    </p>

                    {selectedServiceData.benefits?.he && selectedServiceData.benefits.he.length > 0 && (
                      <ScrollAnimated type="stagger" className="mb-8">
                        <h4 className="text-lg font-frank font-bold text-secondary mb-4">יתרונות השירות:</h4>
                        <ul className="space-y-2.5">
                          {selectedServiceData.benefits.he.map((benefit, i) => (
                            <StaggerItem key={i} className="flex items-start gap-2 font-assistant text-gray-600 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary shrink-0 mt-0.5">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                              <span>{benefit}</span>
                            </StaggerItem>
                          ))}
                        </ul>
                      </ScrollAnimated>
                    )}

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

                  <ScrollAnimated type="fadeUp" delay={0.3} className="overflow-hidden rounded-xl">
                    {selectedServiceData.beforeAfterImages && getImageUrl ? (
                      <BeforeAfterSlider
                        beforeImage={getImageUrl(selectedServiceData, 'before')}
                        afterImage={getImageUrl(selectedServiceData, 'after')}
                        beforeLabel="לפני"
                        afterLabel="אחרי"
                      />
                    ) : (
                      <div className="aspect-video bg-neutral rounded-xl overflow-hidden">
                        {getImageUrl && (
                          <img
                            src={getImageUrl(selectedServiceData, 'main')}
                            alt={selectedServiceData.title.he}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                  </ScrollAnimated>
                </ScrollAnimated>
              </div>
            </ScrollAnimated>
          ) : (
            <ScrollAnimated type="fadeIn" className="text-center py-10">
              <p className="text-lg font-assistant text-gray-500 mb-4">בחרו שירות מהרשימה למעלה כדי לראות פרטים נוספים</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-primary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </ScrollAnimated>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesEnhanced;
