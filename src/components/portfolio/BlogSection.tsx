import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Calendar } from 'lucide-react';

const BlogSection: React.FC = () => {
  const { posts, loading } = useBlogPosts();

  // Only show published posts
  const publishedPosts = posts.filter(post => post.published);

  if (loading) {
    return (
      <section id="blog" className="py-16 px-3 border-t border-border/30">
        <div className="w-full max-w-sm mx-auto text-center">
          <div className="animate-pulse space-y-3">
            <div className="h-3 bg-muted rounded w-20 mx-auto" />
            <div className="h-6 bg-muted rounded w-32 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (publishedPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-16 px-3 border-t border-border/30">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <span className="section-label mb-3 block">Insights</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-light tracking-wide mb-4">Blog</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto" />
          </ScrollReveal>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {publishedPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <article className="group">
                {post.cover_image && (
                  <div className="aspect-[16/9] mb-3 overflow-hidden elegant-border">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                  <Calendar className="w-2.5 h-2.5" />
                  <span className="text-[8px] uppercase tracking-widest">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h3 className="text-base font-light tracking-wide mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                {post.excerpt && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
