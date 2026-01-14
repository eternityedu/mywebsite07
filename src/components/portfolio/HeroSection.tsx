import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/contexts/PortfolioContext';

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          {hero.image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-12"
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border border-primary/30">
                <img 
                  src={hero.image} 
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
          
          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6"
          >
            {hero.name}
          </motion.h1>
          
          {/* Title */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-label mb-8"
          >
            {hero.title}
          </motion.p>
          
          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="divider mx-auto mb-8"
          />
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg text-muted-foreground font-light max-w-xl mx-auto leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
