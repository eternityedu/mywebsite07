import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/contexts/PortfolioContext';

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nameFontSize, setNameFontSize] = useState(32);

  // Auto-size name to fit in one line
  useEffect(() => {
    const adjustFontSize = () => {
      if (!nameRef.current || !containerRef.current) return;
      
      const container = containerRef.current;
      const maxWidth = container.clientWidth - 32; // Account for padding
      let size = 32; // Start with smaller base size for mobile-first
      
      nameRef.current.style.fontSize = `${size}px`;
      
      // Increase size if there's room (for longer names, reduce)
      while (nameRef.current.scrollWidth <= maxWidth && size < 48) {
        size += 1;
        nameRef.current.style.fontSize = `${size}px`;
      }
      
      // Reduce if too wide
      while (nameRef.current.scrollWidth > maxWidth && size > 16) {
        size -= 1;
        nameRef.current.style.fontSize = `${size}px`;
      }
      
      setNameFontSize(size);
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [hero.name]);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div ref={containerRef} className="w-full max-w-md mx-auto text-center">
        {/* Profile Image */}
        {hero.image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-primary/30">
              <img 
                src={hero.image} 
                alt={hero.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
        
        {/* Name - Auto-sizing */}
        <motion.h1 
          ref={nameRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-light tracking-wider mb-4 whitespace-nowrap overflow-hidden"
          style={{ fontSize: `${nameFontSize}px` }}
        >
          {hero.name}
        </motion.h1>
        
        {/* Title */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-6"
        >
          {hero.title}
        </motion.p>
        
        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="divider mx-auto mb-6"
        />
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-sm text-muted-foreground font-light leading-relaxed px-2"
        >
          {hero.subtitle}
        </motion.p>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
