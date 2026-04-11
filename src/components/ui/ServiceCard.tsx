'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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

const specialtyLabels: Record<string, string> = {
  'precise-cuts': 'חיתוכים מדויקים',
  'large-format': 'אריחים גדולים',
  'pattern-layouts': 'דוגמאות מורכבות',
  'waterproof': 'איטום למים',
  'backsplashes': 'חיפוי קיר למטבח',
  'shower-installations': 'התקנות מקלחת',
  'artistic': 'עבודות אומנות',
  'detailed-work': 'עבודה מדויקת',
  'color-matching': 'התאמת צבעים',
};

const iconMap: Record<string, React.ReactNode> = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
  ),
  bath: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
      <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 01.318.612v9.3a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-9.3a.75.75 0 01.319-.612l1.36-.738z" />
    </svg>
  ),
  puzzle: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
  </svg>
);

const fallbackColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-neutral'];

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
  const [imageError, setImageError] = useState(false);
  const renderedIcon = iconMap[icon] ?? fallbackIcon;
  const fallbackBg = fallbackColors[(id - 1) % fallbackColors.length];
  const hasValidImage = imageUrl && !imageUrl.startsWith('data:image') && !imageError;

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      onClick={onClick}
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer
        border ${isSelected ? 'border-primary shadow-elevation-3' : 'border-gray-100 shadow-elevation-1 hover:shadow-elevation-3 hover:border-primary/30'}`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl transition-colors duration-300 ${isSelected ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/40'}`} />

      {/* Image */}
      <div className="relative h-44 overflow-hidden shrink-0">
        {hasValidImage ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`absolute inset-0 ${fallbackBg} flex items-center justify-center`}>
            <div className="text-white/80">{renderedIcon}</div>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Icon badge */}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm">
          {renderedIcon}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-frank font-bold text-secondary mb-2 leading-snug">{title}</h3>
        <p className="text-gray-500 font-assistant text-sm leading-relaxed line-clamp-2 mb-4">{description}</p>

        {/* Feature list */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-assistant">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary shrink-0 mt-0.5"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Specialty tags */}
        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specialties.slice(0, 3).map((s, i) => (
              <span key={i} className="text-xs font-assistant bg-primary/8 text-primary/80 px-2 py-0.5 rounded-full border border-primary/15">
                {specialtyLabels[s] ?? s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-assistant font-medium text-primary group-hover:underline transition-all">
            פרטים נוספים
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-primary transition-transform duration-200 group-hover:-translate-x-1 rtl:rotate-180"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
