'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  features: string[];
  specialties: string[];
  imageUrl: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  features,
  specialties,
  imageUrl,
  icon,
  isSelected = false,
  onClick,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Map specialty codes to human-readable Hebrew labels
  const specialtyLabels: Record<string, string> = {
    'precise-cuts': 'חיתוכים מדויקים',
    'large-format': 'אריחים גדולים',
    'pattern-layouts': 'דוגמאות מורכבות',
    'waterproof': 'איטום למים',
    'backsplashes': 'חיפוי קיר למטבח',
    'shower-installations': 'התקנות מקלחת',
    'artistic': 'עבודות אומנות',
    'detailed-work': 'עבודה מדויקת',
    'color-matching': 'התאמת צבעים'
  };
  
  // Render appropriate icon
  const renderIcon = () => {
    switch (icon) {
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        );
      case 'bath':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
            <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 01.318.612v9.3a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-9.3a.75.75 0 01.319-.612l1.36-.738z" />
          </svg>
        );
      case 'puzzle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Get background color based on service ID for fallback image
  const getFallbackBgColor = () => {
    switch (id) {
      case 1: return 'bg-primary';
      case 2: return 'bg-secondary';
      case 3: return 'bg-accent';
      default: return 'bg-neutral';
    }
  };

  return (
    <div 
      className={`relative group bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden 
                ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        {(!imageUrl || imageUrl === "undefined") ? (
          // Fallback display when no image URL is provided
          <div 
            className={`absolute inset-0 ${getFallbackBgColor()} flex items-center justify-center`}
            aria-label={title}
          >
            <div className="text-white p-6 text-center">
              <div className="text-4xl mb-2">{renderIcon()}</div>
              <div className="text-lg font-medium">{title}</div>
            </div>
          </div>
        ) : imageUrl.startsWith('data:image') ? (
          // SVG data URL fallback
          <div 
            className={`absolute inset-0 ${getFallbackBgColor()} flex items-center justify-center`}
            aria-label={title}
          >
            <div className="text-white p-6 text-center">
              <div className="text-4xl mb-2">{renderIcon()}</div>
              <div className="text-lg font-medium">{title}</div>
            </div>
          </div>
        ) : imageUrl.startsWith('http') ? (
          // Direct remote URL (Cloudinary) handling
          <>
            {isImageLoading && (
              <div className={`absolute inset-0 ${getFallbackBgColor()} animate-pulse flex items-center justify-center z-0`}>
                <div className="text-white text-lg font-medium">{title}</div>
              </div>
            )}
            <Image 
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              } transition-opacity`}
              onLoad={() => setIsImageLoading(false)}
              blurDataURL={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNDNjYiLz48L3N2Zz4=`}
              placeholder="blur"
              onError={(e) => {
                // Handle image load error
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                setIsImageLoading(false);
                
                // Add a colored background to the parent element
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add(getFallbackBgColor());
                  parent.classList.add('flex', 'items-center', 'justify-center');
                  
                  // Replace with icon and text
                  parent.innerHTML = `
                    <div class="text-white p-6 text-center">
                      <div class="text-4xl mb-2">${id === 1 ? '🏠' : id === 2 ? '🛁' : '🧩'}</div>
                      <div class="text-lg font-medium">${title}</div>
                    </div>
                  `;
                }
              }}
              priority
            />
          </>
        ) : imageUrl.endsWith('.svg') ? (
          // Direct SVG display
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-label={title}
          />
        ) : (
          // Image component with improved loading performance
          <>
            {isImageLoading && (
              <div className={`absolute inset-0 ${getFallbackBgColor()} animate-pulse flex items-center justify-center z-0`}>
                <div className="text-white text-lg font-medium">{title}</div>
              </div>
            )}
            <Image 
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              } transition-opacity`}
              onLoad={() => setIsImageLoading(false)}
              blurDataURL={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNDNjYiLz48L3N2Zz4=`}
              placeholder="blur"
              onError={(e) => {
                // Remove the target src to prevent continuous error loops
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                setIsImageLoading(false);
                
                // Add a colored background to the parent element
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add(getFallbackBgColor());
                  parent.classList.add('flex', 'items-center', 'justify-center');
                  
                  // Replace with icon and text
                  parent.innerHTML = `
                    <div class="text-white p-6 text-center">
                      <div class="text-4xl mb-2">${id === 1 ? '🏠' : id === 2 ? '🛁' : '🧩'}</div>
                      <div class="text-lg font-medium">${title}</div>
                    </div>
                  `;
                }
              }}
              priority
            />
          </>
        )}
      </div>

      {/* Service Title & Specialties */}
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-full ml-3">
            {renderIcon()}
          </div>
          <h3 className="text-xl font-frank font-bold text-secondary">{title}</h3>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
        
        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start rtl:text-right">
              <span className="text-primary ml-2 mt-1">✓</span>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {specialties.map((specialty, index) => (
            <span 
              key={index} 
              className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
            >
              {specialtyLabels[specialty] || specialty}
            </span>
          ))}
        </div>
      </div>
      
      {/* Action link for details */}
      <div className="p-4 border-t border-gray-100">
        <Link 
          href={`#service-${id}`} 
          className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          <span>פרטים נוספים</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard; 