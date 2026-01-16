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
      <section id="blog" className="py-20 px-4 border-t border-border/30">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-24 mx-auto" />
            <div className="h-8 bg-muted rounded w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (publishedPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 px-4 border-t border-border/30">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="section-label mb-4 block">Insights</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl font-light tracking-wide mb-6">Blog</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="divider mx-auto" />
          </ScrollReveal>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {publishedPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <article className="group">
                {post.cover_image && (
                  <div className="aspect-[16/9] mb-4 overflow-hidden elegant-border">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
