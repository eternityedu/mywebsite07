import React from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Download, FileText } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ResumeSection: React.FC = () => {
  const { data } = usePortfolio();

  const handleDownload = () => {
    if (data.resume?.file) {
      const link = document.createElement('a');
      link.href = data.resume.file;
      link.download = data.resume.filename || 'resume.pdf';
      link.click();
    }
  };

  return (
    <section id="resume" className="py-32 md:py-40 border-t border-border/30">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="section-label mb-6 block">Resume</span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="section-heading mb-8">My Background</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto mb-12" />
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto">
              {data.resume?.description || "Download my resume to learn more about my experience, education, and professional journey."}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {data.resume?.file ? (
                <button
                  onClick={handleDownload}
                  className="btn-solid"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              ) : (
                <div className="card-minimal px-8 py-6 flex items-center gap-4">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">Resume available upon request</span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
