'use client';

import { useState, useEffect } from 'react';

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

interface UseProjectsReturn {
  projects: Project[] | null;
  loading: boolean;
  error: Error | null;
}

const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch projects data from the API
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        
        const data = await response.json();
        
        // Sort projects by completion date (newest first)
        const sortedProjects = data.sort((a: Project, b: Project) => {
          if (!a.completionDate || !b.completionDate) return 0;
          return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
        });
        
        setProjects(sortedProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return { projects, loading, error };
};

export default useProjects; 