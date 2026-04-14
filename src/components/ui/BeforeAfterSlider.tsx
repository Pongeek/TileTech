'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  beforeAlt = 'לפני ההתקנה',
  afterAlt = 'אחרי ההתקנה',
  beforeLabel = 'לפני',
  afterLabel = 'אחרי',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      calculatePosition(e.clientX);
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !e.touches[0]) return;
      e.preventDefault();
      calculatePosition(e.touches[0].clientX);
    };
    const onTouchEnd = () => { isDragging.current = false; };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [calculatePosition]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const isValidUrl = (url: string) => url && (url.startsWith('http') || url.startsWith('/'));

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl bg-gray-200 select-none"
      style={{ height: '400px', cursor: 'ew-resize' }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* After image — full width, back layer */}
      <div className="absolute inset-0">
        {isValidUrl(afterImage) ? (
          <Image src={afterImage} alt={afterAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">{afterLabel}</div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm font-heebo px-3 py-1 rounded-full">
          {afterLabel}
        </div>
      </div>

      {/* Before image — clipped via clip-path, front layer */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {isValidUrl(beforeImage) ? (
          <Image src={beforeImage} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
        ) : (
          <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600">{beforeLabel}</div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-sm font-heebo px-3 py-1 rounded-full">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle — slider-drag-hint plays once on mount to show it's draggable */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none slider-drag-hint"
        style={{ left: `${sliderPosition}%` }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414zM7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
