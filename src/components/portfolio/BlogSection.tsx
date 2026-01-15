import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const BlogSection: React.FC = () => {
  const { posts, loading } = useBlogPosts(true);

  if (loading) {
    return (
      <section id="blog" className="py-24 md:py-32">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse h-8 bg-muted rounded w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="container px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <span className="section-label">Insights</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mt-4 tracking-wide">
                Blog
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <article className="group elegant-border p-6 h-full flex flex-col">
                  {post.cover_image && (
                    <div className="aspect-video mb-6 overflow-hidden -mx-6 -mt-6">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-3 h-3" />
                    <time className="text-xs uppercase tracking-widest">
                      {format(new Date(post.created_at), 'MMM d, yyyy')}
                    </time>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-light mb-3 leading-snug">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <button className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </button>
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

export default BlogSection;
