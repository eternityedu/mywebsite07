import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AutoSizeTextProps {
  text: string;
  className?: string;
  minFontSize?: number;
  maxFontSize?: number;
}

const AutoSizeText: React.FC<AutoSizeTextProps> = ({
  text,
  className,
  minFontSize = 16,
  maxFontSize = 48,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!containerRef.current || !textRef.current) return;

      const container = containerRef.current;
      const textElement = textRef.current;
      
      let currentSize = maxFontSize;
      textElement.style.fontSize = `${currentSize}px`;
      
      // Reduce font size until text fits in one line
      while (
        textElement.scrollWidth > container.clientWidth &&
        currentSize > minFontSize
      ) {
        currentSize -= 1;
        textElement.style.fontSize = `${currentSize}px`;
      }
      
      setFontSize(currentSize);
    };

    adjustFontSize();
    
    // Re-adjust on window resize
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [text, minFontSize, maxFontSize]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <span
        ref={textRef}
        className={cn('block whitespace-nowrap', className)}
        style={{ fontSize: `${fontSize}px` }}
      >
        {text}
      </span>
    </div>
  );
};

export default AutoSizeText;
