import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';

const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-md mx-auto">
        {/* Image */}
        <ScrollReveal className="mb-8">
          <div className="aspect-[4/5] overflow-hidden elegant-border">
            {about.image ? (
              <img 
                src={about.image} 
                alt="About"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <span className="text-4xl opacity-20">✦</span>
              </div>
            )}
          </div>
        </ScrollReveal>
        
        {/* Content */}
        <div>
          <ScrollReveal>
            <span className="section-label mb-4 block">About</span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl font-light tracking-wide mb-6">
              {about.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="divider mb-6" />
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {about.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
