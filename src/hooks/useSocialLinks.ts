import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  display_order: number;
  created_at: string;
}

export const useSocialLinks = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const addLink = async (name: string, url: string) => {
    const maxOrder = links.length > 0 ? Math.max(...links.map(l => l.display_order)) : 0;
    const { error } = await supabase
      .from('social_links')
      .insert({ name, url, display_order: maxOrder + 1 });

    if (error) throw error;
    await fetchLinks();
  };

  const updateLink = async (id: string, updates: Partial<SocialLink>) => {
    const { error } = await supabase
      .from('social_links')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    await fetchLinks();
  };

  const deleteLink = async (id: string) => {
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchLinks();
  };

  return { links, loading, addLink, updateLink, deleteLink, refetch: fetchLinks };
};
