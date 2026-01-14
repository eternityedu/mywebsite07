import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';

const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Image */}
            <ScrollReveal direction="left" className="order-2 md:order-1">
              <div className="aspect-[3/4] overflow-hidden elegant-border">
                {about.image ? (
                  <img 
                    src={about.image} 
                    alt="About"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <span className="text-6xl opacity-20">✦</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
            
            {/* Content */}
            <div className="order-1 md:order-2">
              <ScrollReveal>
                <span className="section-label mb-6 block">About</span>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <h2 className="section-heading mb-8">
                  {about.title}
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="divider mb-8" />
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <p className="text-muted-foreground leading-[1.9] whitespace-pre-line">
                  {about.description}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
