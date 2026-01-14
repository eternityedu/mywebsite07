import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
              Expertise
            </span>
            <h2 className="section-heading font-serif mb-6">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-gold-light mx-auto" />
          </div>
          
          {/* Skills Grid */}
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div 
                key={skill}
                className="px-6 py-3 bg-card border border-border rounded-full font-medium hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105 cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
