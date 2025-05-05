'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { useProjects } from '@/hooks';
import ProjectCard from '@/components/ui/ProjectCard';
import Button from '@/components/ui/Button';
import ScrollAnimated, { StaggerItem } from '@/components/ui/ScrollAnimated';
import ProjectModal from '@/components/ui/ProjectModal';
import { AnalyticsEvents } from '@/utils/analytics';

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

// Breakpoints for the masonry grid
const breakpointColumns = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

// Filter categories
const categories = ['הכל', 'מטבחים', 'חדרי אמבטיה', 'רצפות', 'קירות', 'פסיפסים'];

const ProjectsEnhanced: React.FC = () => {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  
  // Ensure projects is not null by providing a default empty array
  const projectsArray = projects || [];
  
  // Filter projects by category
  const filteredProjects = selectedCategory === 'הכל'
    ? projectsArray
    : projectsArray.filter(project => project.category === selectedCategory);
  
  // Get displayed projects
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
    
  // Handle project click to open modal
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    AnalyticsEvents.projectView(project.id, project.title.he, project.category);
  };
  
  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 3);
    AnalyticsEvents.ctaClick('gallery_load_more', 'Load more');
  };
  
  return (
    <section id="gallery" className="section bg-white py-20">
      <div className="container-custom">
        {/* Section heading */}
        <ScrollAnimated type="fadeDown" className="text-center mb-12">
          <h2 className="heading-2 mb-4">הגלריה שלנו</h2>
          <p className="body-large max-w-3xl mx-auto">
            צפו בתיעוד של העבודות האחרונות שלנו. אנו מתמחים במגוון פרויקטים,
            מבתים פרטיים ועד מרחבים מסחריים.
          </p>
        </ScrollAnimated>
        
        {/* Category filters */}
        <ScrollAnimated type="fadeUp" className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="small"
              onClick={() => {
                setSelectedCategory(category);
                AnalyticsEvents.ctaClick('gallery_filter', category);
              }}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </ScrollAnimated>
        
        {/* Projects masonry grid */}
        <ScrollAnimated type="stagger" className="mb-10">
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {displayedProjects.map((project) => (
              <StaggerItem key={project.id} className="mb-4">
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  imageUrl={project.imageUrl}
                  onClick={() => handleProjectClick(project)}
                  dimensions={project.dimensions}
                />
              </StaggerItem>
            ))}
          </Masonry>
        </ScrollAnimated>
        
        {/* Load more button */}
        {filteredProjects.length > visibleProjects && (
          <ScrollAnimated type="fadeUp" className="text-center mt-10">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              }
              iconPosition="left"
            >
              טען עוד
            </Button>
          </ScrollAnimated>
        )}
        
        {/* No results message */}
        {filteredProjects.length === 0 && (
          <ScrollAnimated type="fadeIn" className="text-center py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-dark mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="body-large">לא נמצאו פרויקטים בקטגוריה זו</p>
          </ScrollAnimated>
        )}
        
        {/* Project modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsEnhanced; 