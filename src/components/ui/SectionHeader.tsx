import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  /** Optional line between title and description (e.g. StandardizedSection subtitle) */
  subtitle?: string;
  description?: string;
  accentBar?: boolean;
  eyebrowUppercase?: boolean;
  /** Render text in white/light tones for dark section backgrounds */
  invertColors?: boolean;
  className?: string;
}

/**
 * Shared section title block: optional eyebrow, heading, optional accent rule, optional description.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  description,
  accentBar = false,
  eyebrowUppercase = false,
  invertColors = false,
  className = '',
}) => (
  <div className={`text-center ${className}`.trim()}>
    {eyebrow ? (
      <span
        className={`inline-block font-assistant font-semibold text-base mb-2 tracking-wide ${
          eyebrowUppercase ? 'uppercase' : ''
        } ${invertColors ? 'text-primary-light' : 'text-primary'}`}
      >
        {eyebrow}
      </span>
    ) : null}
    <h2 className={`text-3xl md:text-4xl font-frank font-bold mb-4 ${invertColors ? 'text-white' : 'text-secondary'}`}>
      {title}
    </h2>
    {accentBar ? (
      <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-5" aria-hidden />
    ) : null}
    {subtitle ? (
      <h3 className={`text-xl md:text-2xl font-frank font-semibold mb-4 max-w-3xl mx-auto ${invertColors ? 'text-white/70' : 'text-gray-500'}`}>
        {subtitle}
      </h3>
    ) : null}
    {description ? (
      <p className={`text-lg font-assistant max-w-3xl mx-auto leading-relaxed ${invertColors ? 'text-white/60' : 'text-gray-600'}`}>
        {description}
      </p>
    ) : null}
  </div>
);

export default SectionHeader;
