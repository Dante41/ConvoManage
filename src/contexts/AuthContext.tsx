import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  // Lazy load supabase to handle configuration errors
  const getSupabase = async () => {
    try {
      const { supabase } = await import('../lib/supabase');
      return supabase;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to database';
      setSupabaseError(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabase = await getSupabase();
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: 'organizer', // Default role, should be fetched from user metadata
          });
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Set up auth listener only if supabase is available
    let subscription: any = null;
    getSupabase().then(supabase => {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              role: 'organizer',
            });
          } else {
            setUser(null);
          }
        }
      );
      subscription = data;
    }).catch(() => {
      // Supabase not available, skip listener setup
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setUserRole(data.role);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (supabaseError) {
        throw new Error(supabaseError);
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (supabaseError) {
        throw new Error(supabaseError);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      if (supabaseError) {
        throw new Error(supabaseError);
      }
      throw error;
    }
  };

  const value = {
    user,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}