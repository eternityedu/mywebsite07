import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ExternalLink } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="py-20 px-4 border-t border-border/30">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="section-label mb-4 block">Portfolio</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl font-light tracking-wide mb-6">Selected Work</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto" />
          </ScrollReveal>
        </div>
        
        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <div className="group">
                {/* Image */}
                <div className="aspect-[16/10] mb-5 overflow-hidden elegant-border">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <span className="text-3xl opacity-20">✦</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {project.link && project.link !== '#' && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                    >
                      View Project
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
