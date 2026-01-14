import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                {about.image ? (
                  <img 
                    src={about.image} 
                    alt="About"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                )}
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-2xl -z-10" />
            </div>
            
            {/* Content */}
            <div className="order-1 md:order-2">
              <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
                About Me
              </span>
              <h2 className="section-heading font-serif mb-6">
                {about.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-gold-light mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {about.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
