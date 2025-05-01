// This file is a lazy-loaded version of the Projects component
import { lazyLoad } from '@/utils/lazyLoad';

// Use the lazyLoad utility to dynamically import the Projects component
const Projects = lazyLoad(() => import('./Projects'), {
  fallback: (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="h-10 w-48 bg-gray-200 animate-pulse mx-auto rounded mb-4"></div>
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse mx-auto rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded mb-3"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

export default Projects; 