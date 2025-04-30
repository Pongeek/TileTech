'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { useProjects } from '@/hooks';

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

const Projects: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Set initial filtered projects
  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects);
    }
  }, [projects]);
  
  // Handle category filter change with animation
  const handleCategoryChange = (category: string) => {
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
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-frank font-bold text-secondary mb-4">הפרויקטים שלנו</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 font-assistant">
            צפו בחלק מהפרויקטים האחרונים שביצענו. אנו מתמחים בריצוף ביתי, מטבחים, חדרי אמבטיה ופרויקטים מסחריים.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-assistant transition-all
                ${selectedCategory === category ? 
                  'bg-primary text-white shadow-md scale-105' : 
                  'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => handleCategoryChange(category)}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        {loading ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex w-full -ml-4">
              <div className="pl-4 w-full sm:w-1/2 lg:w-1/3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="mb-4 bg-gray-200 rounded-lg animate-pulse" style={{ height: `${Math.floor(Math.random() * 100) + 200}px` }}></div>
                ))}
              </div>
              <div className="hidden sm:block pl-4 w-1/2 lg:w-1/3">
                {[1, 2].map((n) => (
                  <div key={n} className="mb-4 bg-gray-200 rounded-lg animate-pulse" style={{ height: `${Math.floor(Math.random() * 100) + 200}px` }}></div>
                ))}
              </div>
              <div className="hidden lg:block pl-4 w-1/3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="mb-4 bg-gray-200 rounded-lg animate-pulse" style={{ height: `${Math.floor(Math.random() * 100) + 200}px` }}></div>
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
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="mb-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5,
                          delay: project.id * 0.1 % 0.5 // stagger effect based on ID
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
            <ProjectModal
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