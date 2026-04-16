'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { lazyLoad } from '@/utils/lazyLoad';
import ProjectModalLazy from '@/components/ui/ProjectModalLazy';
import { useProjects } from '@/hooks';
import { AnalyticsEvents } from '@/utils/analytics';
import SectionHeader from '@/components/ui/SectionHeader';

interface Project {
  id: number;
  title: {
    he: string;
    en: string;
  };
  description: {
    he: string;
    en: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  thumbnailUrl: string;
  galleryImages?: string[];
  dimensions: {
    width: number;
    height: number;
  };
  completionDate?: string;
  location?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 50,
      damping: 10
    }
  }
};

// Create lazy-loaded ProjectCard component
const ProjectCard = lazyLoad(() => import('@/components/ui/ProjectCard'), {
  fallback: (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-200 w-full h-52"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
});

const Projects: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Set initial filtered projects
  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects);
    }
  }, [projects]);
  
  // Handle category filter change with animation
  const handleCategoryChange = (category: string) => {
    // Close any open project when changing categories
    setSelectedProject(null);
    setSelectedProjectIndex(-1);
    
    setSelectedCategory(category);
    
    // Add a small delay for animation effect
    setTimeout(() => {
      if (category === 'all') {
        setFilteredProjects(projects || []);
      } else {
        setFilteredProjects((projects || []).filter((project: Project) => project.category === category));
      }
    }, 100);
  };
  
  // Handle project selection
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    const index = (projects || []).findIndex((p: Project) => p.id === project.id);
    setSelectedProjectIndex(index);
    
    // Track project view analytics event
    AnalyticsEvents.projectView(
      project.id,
      project.title.he,
      project.category
    );
  };
  
  // Handle navigation between projects in modal
  const handlePrevProject = () => {
    if (selectedProjectIndex > 0 && projects) {
      const prevIndex = selectedProjectIndex - 1;
      setSelectedProject(projects[prevIndex]);
      setSelectedProjectIndex(prevIndex);
    }
  };
  
  const handleNextProject = () => {
    if (selectedProjectIndex < (projects?.length || 0) - 1 && projects) {
      const nextIndex = selectedProjectIndex + 1;
      setSelectedProject(projects[nextIndex]);
      setSelectedProjectIndex(nextIndex);
    }
  };
  
  // Close project modal
  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedProjectIndex(-1);
  };
  
  // Get unique categories for filter buttons
  const categories = projects ? 
    ['all', ...Array.from(new Set<string>(projects.map((project: Project) => project.category)))] : 
    ['all'];
  
  // Category label mapping
  const categoryLabels: { [key: string]: string } = {
    'all': 'הכל',
    'residential': 'ריצוף ביתי',
    'bathroom': 'חדרי אמבטיה',
    'kitchen': 'מטבחים',
    'commercial': 'מסחרי'
  };
  
  // Masonry breakpoint columns
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };
  
  return (
    <section id="projects" className="py-16 bg-neutral" ref={sectionRef}>
      <div className="container-custom">
        <SectionHeader
          eyebrow="תיק עבודות"
          title="הפרויקטים שלנו"
          description="צפו בחלק מהפרויקטים האחרונים שביצענו. אנו מתמחים בריצוף ביתי, מטבחים, חדרי אמבטיה ופרויקטים מסחריים."
          className="mb-12"
        />
        
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center mb-10 gap-2"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
              className={`px-5 py-2 rounded-full font-assistant text-sm font-medium transition-all duration-200
                ${selectedCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary shadow-sm'
                }`}
              onClick={() => handleCategoryChange(category)}
            >
              {categoryLabels[category] || category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        {loading ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex w-full -ml-4">
              <div className="pl-4 w-full sm:w-1/2 lg:w-1/3">
                {[240, 300, 220].map((h, n) => (
                  <div key={n} className="mb-4 bg-gray-200 rounded-lg animate-pulse" style={{ height: `${h}px` }}></div>
                ))}
              </div>
              <div className="hidden sm:block pl-4 w-1/2 lg:w-1/3">
                {[280, 200].map((h, n) => (
                  <div key={n} className="mb-4 bg-gray-200 rounded-lg animate-pulse" style={{ height: `${h}px` }}></div>
                ))}
              </div>
              <div className="hidden lg:block pl-4 w-1/3">
                {[210, 260, 230].map((h, n) => (
                  <div key={n} className="mb-4 bg-gray-200 rounded-lg animate-pulse" style={{ height: `${h}px` }}></div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-lg">שגיאה בטעינת הפרויקטים. אנא נסו שוב מאוחר יותר.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="mb-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.5,
                          delay: (index % 3) * 0.1,
                          ease: 'easeOut',
                        }}
                      >
                        <ProjectCard
                          id={project.id}
                          title={project.title}
                          category={project.category}
                          imageUrl={project.thumbnailUrl || project.imageUrl}
                          dimensions={project.dimensions}
                          onClick={() => handleProjectClick(project)}
                        />
                      </motion.div>
                    </div>
                  ))}
                </Masonry>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Bottom CTA */}
        {!loading && !error && filteredProjects.length > 0 && (
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-assistant text-secondary/60 text-sm mb-4">מרוצים ממה שראיתם? בואו נבנה משהו יפה ביחד</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-primary text-white font-frank font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-200"
            >
              <span>דברו איתנו על הפרויקט שלכם</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-lg text-gray-600 font-assistant">
              לא נמצאו פרויקטים בקטגוריה זו.
            </p>
          </div>
        )}
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModalLazy
              project={selectedProject}
              onClose={handleCloseModal}
              onPrev={handlePrevProject}
              onNext={handleNextProject}
              hasPrev={selectedProjectIndex > 0}
              hasNext={selectedProjectIndex < (projects?.length || 0) - 1}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 