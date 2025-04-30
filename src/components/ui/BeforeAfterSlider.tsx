'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'תמונת לפני',
  afterAlt = 'תמונת אחרי',
  beforeLabel = 'לפני',
  afterLabel = 'אחרי',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const calculateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const containerWidth = rect.width;
    
    // Calculate position as percentage
    let percentage = (x / containerWidth) * 100;
    
    // Clamp value between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    calculateSliderPosition(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    calculateSliderPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Determine if images are SVGs or data URLs
  const isBeforeSvg = beforeImage.endsWith('.svg') || beforeImage.startsWith('data:');
  const isAfterSvg = afterImage.endsWith('.svg') || afterImage.startsWith('data:');
  
  // Prepare background styles for SVG rendering
  const beforeStyle = isBeforeSvg ? {
    backgroundImage: `url(${beforeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};
  
  const afterStyle = isAfterSvg ? {
    backgroundImage: `url(${afterImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  return (
    <div 
      className="relative w-full overflow-hidden rounded-lg bg-neutral h-[300px] md:h-[400px] lg:h-[500px]"
      ref={containerRef}
      aria-label="השוואת לפני ואחרי"
      role="figure"
    >
      {/* After Image (Full width, back) */}
      <div className="absolute inset-0 w-full h-full">
        {isAfterSvg || afterError ? (
          <div 
            className="w-full h-full" 
            style={afterStyle}
            aria-label={afterAlt}
          >
            {!afterImage && (
              <div className="flex items-center justify-center h-full">
                <span className="text-lg font-medium text-white">{afterLabel}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={() => setAfterError(true)}
              priority
            />
          </div>
        )}
        
        {/* After Label */}
        <div className="absolute bottom-4 right-4 bg-accent/80 text-white py-1 px-3 rounded">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Partial width, front) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        {isBeforeSvg || beforeError ? (
          <div 
            className="w-full h-full" 
            style={beforeStyle}
            aria-label={beforeAlt}
          >
            {!beforeImage && (
              <div className="flex items-center justify-center h-full">
                <span className="text-lg font-medium text-white">{beforeLabel}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={() => setBeforeError(true)}
              priority
            />
          </div>
        )}
        
        {/* Before Label */}
        <div className="absolute bottom-4 left-4 bg-gray-700/80 text-white py-1 px-3 rounded">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Control */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-ew-resize">
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider; 