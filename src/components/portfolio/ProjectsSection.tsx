import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="section-label mb-6 block">Portfolio</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-heading mb-8">Selected Work</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="divider mx-auto" />
            </ScrollReveal>
          </div>
          
          {/* Projects List */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <article className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Image */}
                  <div className={`aspect-[16/10] overflow-hidden elegant-border ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                        <span className="text-4xl opacity-20">✦</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                    <span className="section-label mb-4 block">0{index + 1}</span>
                    <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className={`flex flex-wrap gap-3 mb-6 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary link-underline text-sm tracking-widest uppercase"
                      >
                        View Project
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
