import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  /** Optional line between title and description (e.g. StandardizedSection subtitle) */
  subtitle?: string;
  description?: string;
  accentBar?: boolean;
  eyebrowUppercase?: boolean;
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
  className = '',
}) => (
  <div className={`text-center ${className}`.trim()}>
    {eyebrow ? (
      <span
        className={`inline-block text-primary font-assistant font-semibold text-base mb-2 tracking-wide ${
          eyebrowUppercase ? 'uppercase' : ''
        }`}
      >
        {eyebrow}
      </span>
    ) : null}
    <h2 className="text-3xl md:text-4xl font-frank font-bold text-secondary mb-4">{title}</h2>
    {accentBar ? (
      <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-5" aria-hidden />
    ) : null}
    {subtitle ? (
      <h3 className="text-xl md:text-2xl font-frank font-semibold text-gray-500 mb-4 max-w-3xl mx-auto">
        {subtitle}
      </h3>
    ) : null}
    {description ? (
      <p className="text-lg font-assistant text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    ) : null}
  </div>
);

export default SectionHeader;
