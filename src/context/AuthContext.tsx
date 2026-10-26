import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  rawUser: User | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  useGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_GUEST_KEY = 'khmer_java_guest_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [rawUser, setRawUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Offline / Local mode
      const savedGuest = localStorage.getItem(LOCAL_GUEST_KEY);
      if (savedGuest) {
        try {
          setUser(JSON.parse(savedGuest));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
      return;
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setRawUser(session.user);
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'សិស្ស Java',
        });
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setRawUser(session.user);
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'សិស្ស Java',
        });
      } else {
        setRawUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      // Local fallback sign in
      const guest: UserProfile = {
        id: 'local-' + Date.now(),
        email,
        displayName: email.split('@')[0],
      };
      localStorage.setItem(LOCAL_GUEST_KEY, JSON.stringify(guest));
      setUser(guest);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!isSupabaseConfigured || !supabase) {
      // Local fallback sign up
      const guest: UserProfile = {
        id: 'local-' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0],
      };
      localStorage.setItem(LOCAL_GUEST_KEY, JSON.stringify(guest));
      setUser(guest);
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: displayName },
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_GUEST_KEY);
    setUser(null);
    setRawUser(null);
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: new Error('សូមកំណត់ Supabase URL និង Key ជាមុនសិន ដើម្បីប្រើមុខងារកំណត់ពាក្យសម្ងាត់ឡើងវិញតាមអ៊ីមែល។') };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth?type=recovery',
    });
    return { error };
  };

  const useGuestMode = () => {
    const guestUser: UserProfile = {
      id: 'guest-' + Math.floor(Math.random() * 10000),
      email: 'guest@khmerjava.academy',
      displayName: 'សិស្សស្វ័យសិក្សា (Guest)',
    };
    localStorage.setItem(LOCAL_GUEST_KEY, JSON.stringify(guestUser));
    setUser(guestUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        rawUser,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        resetPassword,
        useGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
