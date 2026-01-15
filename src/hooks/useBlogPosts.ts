import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = (publishedOnly: boolean = true) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (publishedOnly) {
        query = query.eq('published', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  }, [publishedOnly]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    await fetchPosts();
    return data;
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    const { error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    await fetchPosts();
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchPosts();
  };

  return { posts, loading, createPost, updatePost, deletePost, refetch: fetchPosts };
};
