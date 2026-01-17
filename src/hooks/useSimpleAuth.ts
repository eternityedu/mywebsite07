import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SimpleAuthState {
  isAdmin: boolean;
  loading: boolean;
  adminName: string | null;
}

// Session key for admin state (in-memory only, not persisted)
let adminSession: { isAdmin: boolean; adminName: string | null } = {
  isAdmin: false,
  adminName: null,
};

export const useSimpleAuth = () => {
  const [authState, setAuthState] = useState<SimpleAuthState>({
    isAdmin: adminSession.isAdmin,
    loading: false,
    adminName: adminSession.adminName,
  });

  const login = useCallback(async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from('admin_credentials')
        .select('username, password_hash')
        .eq('username', username)
        .single();

      if (error || !data) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Simple password comparison (for demo purposes)
      if (data.password_hash === password) {
        adminSession = { isAdmin: true, adminName: data.username };
        setAuthState({ isAdmin: true, loading: false, adminName: data.username });
        return { success: true };
      }

      return { success: false, error: 'Invalid username or password' };
    } catch {
      return { success: false, error: 'An error occurred during login' };
    }
  }, []);

  const logout = useCallback(() => {
    adminSession = { isAdmin: false, adminName: null };
    setAuthState({ isAdmin: false, loading: false, adminName: null });
  }, []);

  // Sync with session on mount
  useEffect(() => {
    setAuthState({
      isAdmin: adminSession.isAdmin,
      loading: false,
      adminName: adminSession.adminName,
    });
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
};
