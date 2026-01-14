import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          {hero.image && (
            <div className="mb-8 animate-fade-in">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-primary/50 gold-glow">
                <img 
                  src={hero.image} 
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Name with gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 animate-slide-up">
            <span className="text-gradient">{hero.name}</span>
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {hero.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {hero.subtitle}
          </p>
          
          {/* CTA Button */}
          <a 
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 animate-slide-up gold-glow"
            style={{ animationDelay: '0.6s' }}
          >
            Explore My Work
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
