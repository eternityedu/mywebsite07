import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioData, defaultData } from '@/contexts/PortfolioContext';
import type { Json } from '@/integrations/supabase/types';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { data: rows, error } = await supabase
        .from('portfolio_data')
        .select('key, value');

      if (error) throw error;

      if (rows && rows.length > 0) {
        const merged = { ...defaultData };
        rows.forEach((row: { key: string; value: Json }) => {
          if (row.key in merged) {
            (merged as Record<string, unknown>)[row.key] = row.value;
          }
        });
        setData(merged);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      // Fallback to localStorage
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        setData({ ...defaultData, ...JSON.parse(saved) });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateData = async (newData: Partial<PortfolioData>) => {
    const updated = { ...data, ...newData };
    setData(updated);

    // Save to Supabase
    try {
      for (const [key, value] of Object.entries(newData)) {
        await supabase
          .from('portfolio_data')
          .upsert({ key, value: value as Json }, { onConflict: 'key' });
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }

    // Also save to localStorage as backup
    localStorage.setItem('portfolioData', JSON.stringify(updated));
  };

  return { data, updateData, loading, refetch: fetchData };
};
