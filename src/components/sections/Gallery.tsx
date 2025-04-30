'use client';

import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  category: string;
  title: string;
}

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'home', label: 'ריצוף ביתי' },
    { id: 'kitchen', label: 'מטבחים' },
    { id: 'bathroom', label: 'חדרי אמבטיה' },
    { id: 'mosaic', label: 'פסיפסים' },
  ];
  
  const galleryItems: GalleryItem[] = [
    { id: 1, category: 'home', title: 'ריצוף סלון מודרני' },
    { id: 2, category: 'kitchen', title: 'חיפוי קיר מטבח' },
    { id: 3, category: 'bathroom', title: 'חדר אמבטיה יוקרתי' },
    { id: 4, category: 'mosaic', title: 'פסיפס מעוצב אישית' },
    { id: 5, category: 'home', title: 'ריצוף חדר שינה' },
    { id: 6, category: 'bathroom', title: 'חדר רחצה מינימליסטי' },
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-16 bg-neutral">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-frank font-bold text-secondary mb-4">
            הפרויקטים שלנו
          </h2>
          <p className="text-lg font-heebo text-gray-700 max-w-2xl mx-auto">
            צפו בעבודות האיכותיות שביצענו עבור לקוחותינו המרוצים
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full font-heebo transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-secondary hover:bg-primary/10'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-secondary h-64 flex items-center justify-center text-white">
                {/* Image placeholder - will be replaced with actual images */}
                <span>תמונת פרויקט</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-frank font-bold text-secondary">{item.title}</h3>
                <p className="text-sm text-gray-600 font-assistant">
                  {categories.find(cat => cat.id === item.category)?.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery; 