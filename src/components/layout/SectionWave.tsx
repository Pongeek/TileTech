import React from 'react';

export interface SectionWaveProps {
  /** Background of the strip (typically matches the section below the wave) */
  bgClassName: string;
  /** SVG path fill (typically matches the section above the wave) */
  fillClassName: string;
  className?: string;
}

/**
 * Full-width curved divider between sections. Uses theme colors via Tailwind fill/bg classes.
 */
const SectionWave: React.FC<SectionWaveProps> = ({
  bgClassName,
  fillClassName,
  className = '',
}) => (
  <div
    className={`relative h-12 overflow-hidden -mt-1 ${bgClassName} ${className}`.trim()}
    aria-hidden="true"
  >
    <svg
      className="absolute bottom-0 w-full h-12"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z"
        className={fillClassName}
      />
    </svg>
  </div>
);

export default SectionWave;
