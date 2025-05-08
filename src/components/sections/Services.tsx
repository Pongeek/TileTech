'use client';

import React, { useState, useRef, useEffect } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { useServices, getLocalizedContent, Service } from '@/hooks/useServices';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fallbackImages, getImageWithFallback, defaultPlaceholder } from '@/utils/imageUtils';
import ServiceCardLazy from '@/components/ui/ServiceCardLazy';
import BeforeAfterSliderLazy from '@/components/ui/BeforeAfterSliderLazy';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0.3 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0.5, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      damping: 15
    }
  }
};

const detailsVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

const Services: React.FC = () => {
  const { services, loading, error, selectedService, selectService } = useServices();
  const [activeTab, setActiveTab] = useState<'cards' | 'details'>('cards');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [shouldLoadImages, setShouldLoadImages] = useState(true); // Always load images immediately

  // Handle service selection
  const handleServiceSelect = (id: number) => {
    selectService(id);
    setActiveTab('details');
    
    // Smooth scroll to the service details
    setTimeout(() => {
      const element = document.getElementById('service-details');
      if (element) {
        // Prevent hash change and use scrollIntoView with offset
        window.history.pushState({}, '', window.location.pathname);
        
        // Calculate position with offset for fixed header
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Close the service details view
  const handleBackToServices = () => {
    setActiveTab('cards');
    selectService(null);
  };

  // Get image URL with fallback
  const getImageUrl = (service: Service, type: 'main' | 'before' | 'after') => {
    // If the service doesn't have the image type
    if (!service?.images?.[type]) {
      return fallbackImages[type][service.id as keyof typeof fallbackImages.main] || defaultPlaceholder;
    }
    
    // Get the path from service
    const imagePath = service.images[type];

    // ➊ NEW: if this is an absolute remote URL (e.g. Cloudinary), use it as-is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // First try using direct SVG if available (local static asset)
    if (imagePath.endsWith('.svg')) {
      return imagePath;
    }
    
    // For local JPG images, try to use an SVG fallback with same name
    if (imagePath.endsWith('.jpg')) {
      const svgPath = imagePath.replace('.jpg', '.svg');
      return svgPath;
    }
    
    // Use fallback as last resort
    return getImageWithFallback(
      imagePath, 
      fallbackImages[type][service.id as keyof typeof fallbackImages.main] || defaultPlaceholder
    );
  };

  // Preload images when component mounts or services change
  useEffect(() => {
    if (!services || loading) return;
    
    // Preload all service images
    services.forEach((service) => {
      const images = [
        getImageUrl(service, 'main'),
        getImageUrl(service, 'before'),
        getImageUrl(service, 'after')
      ];
      
      // Create Image objects to preload
      images.forEach((src) => {
        if (src.startsWith('data:') || src.endsWith('.svg')) return; // Skip data URLs and SVGs
        const img = new Image();
        img.src = src;
      });
    });
  }, [services, loading]);

  if (loading) {
    return (
      <section id="services" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center text-red-500">
            <p>שגיאה בטעינת השירותים. אנא נסה שוב מאוחר יותר.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="services" 
      className="py-16 bg-white"
      ref={sectionRef}
      dir="rtl"
    >
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0.5, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-frank font-bold text-secondary mb-4">
            השירותים שלנו
          </h2>
          <p className="text-lg font-heebo text-gray-700 max-w-3xl mx-auto">
            אנו מציעים מגוון שירותי התקנת אריחים מקצועיים המותאמים לצרכים הספציפיים שלך,
            מריצוף חדרים ועד לעבודות פסיפס מורכבות ומטבחים מעוצבים
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'cards' ? (
            <motion.div 
              key="cards"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="visible"
              animate="visible"
              exit="hidden"
            >
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  custom={index}
                >
                  <ServiceCardLazy
                    id={service.id}
                    title={service.title.he}
                    description={service.description.he}
                    features={service.features.he}
                    specialties={service.specialties}
                    imageUrl={shouldLoadImages ? getImageUrl(service, 'main') : defaultPlaceholder}
                    icon={service.icon}
                    onClick={() => handleServiceSelect(service.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="details"
              id="service-details" 
              className="bg-white rounded-lg shadow-lg p-6 transition-all"
              variants={detailsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {selectedService && (
                <>
                  <div className="flex justify-between items-center mb-6" dir="rtl">
                    <div className="flex items-center ml-4">
                      <motion.div 
                        className="p-2 bg-primary/10 text-primary rounded-full ml-3 rtl:ml-0 rtl:mr-3"
                        initial={{ rotate: -15, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {selectedService.icon === 'home' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                          </svg>
                        )}
                        {selectedService.icon === 'bath' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                            <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 01.318.612v9.3a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-9.3a.75.75 0 01.319-.612l1.36-.738z" />
                          </svg>
                        )}
                        {selectedService.icon === 'puzzle' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
                          </svg>
                        )}
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-frank font-bold text-secondary"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedService.title.he}
                      </motion.h3>
                    </div>

                    <motion.button 
                      onClick={handleBackToServices}
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ x: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>חזרה לרשימת השירותים</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18 " />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" dir="rtl">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex items-center justify-center lg:order-2"
                      dir="rtl"
                    >
                      <BeforeAfterSlider 
                        beforeImage={getImageUrl(selectedService, 'before')}
                        afterImage={getImageUrl(selectedService, 'after')}
                        beforeLabel="לפני"
                        afterLabel="אחרי"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex flex-col lg:order-1"
                      dir="rtl"
                    >
                      <div className="mb-8" dir="rtl">
                        <motion.h4 
                          className="text-xl font-frank font-semibold text-secondary mb-2 text-right"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          תיאור השירות
                        </motion.h4>
                        <div className="w-24 h-0.5 bg-primary mr-0 rounded-full mb-6"></div>
                        <div className="prose prose-primary text-right" dangerouslySetInnerHTML={{ __html: selectedService.description.he }} />
                      </div>
                      
                      <motion.div className="text-right mb-4" dir="rtl">
                        <motion.h4 
                          className="text-xl font-frank font-semibold text-secondary mb-2 text-right"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          יתרונות
                        </motion.h4>
                        <div className="w-16 h-0.5 bg-primary mr-0 rounded-full mb-6"></div>
                      </motion.div>
                      
                      <div className="space-y-3 mb-6 max-w-lg feature-list-rtl">
                        {selectedService.features.he.map((feature, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-50 p-3 rounded-md shadow-sm"
                            dir="rtl"
                          >
                            <table className="w-full feature-list-rtl" dir="rtl">
                              <tbody>
                                <tr>
                                  <td style={{ width: '20px', paddingLeft: '8px', verticalAlign: 'top' }} className="text-primary text-lg">✓</td>
                                  <td style={{ textAlign: 'right' }} className="text-gray-700">{feature}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.a 
                          href="#contact" 
                          className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all inline-block"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          צור קשר לקבלת הצעת מחיר
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services; 