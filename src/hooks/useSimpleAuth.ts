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
      // Use secure RPC function to verify credentials without exposing password hash
      const { data, error } = await supabase.rpc('verify_admin_credentials', {
        _username: username,
        _password: password
      });

      if (error) {
        return { success: false, error: 'An error occurred during login' };
      }

      if (data === true) {
        adminSession = { isAdmin: true, adminName: username };
        setAuthState({ isAdmin: true, loading: false, adminName: username });
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
