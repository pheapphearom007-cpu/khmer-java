import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { UserPreferences } from '../types';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  preferredLanguage?: 'km' | 'en';
  preferences?: UserPreferences;
  createdAt?: string;
}

export interface SignOutOptions {
  scope?: 'local' | 'global';
}

interface AuthContextType {
  user: UserProfile | null;
  rawUser: User | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null }>;
  signOut: (options?: SignOutOptions) => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<{ error: Error | null }>;
  updateDisplayName: (displayName: string) => Promise<{ error: Error | null }>;
  useGuestMode: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_GUEST_KEY = 'khmer_java_guest_user';

function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = window.sessionStorage.getItem('khmer_java_device_id');
  if (!id) {
    id = 'dev-' + Math.random().toString(36).substring(2, 12);
    window.sessionStorage.setItem('khmer_java_device_id', id);
  }
  return id;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [rawUser, setRawUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to fetch user profile details from PostgreSQL public.user_profiles
  const fetchCloudProfile = useCallback(async (authUser: User): Promise<UserProfile> => {
    const defaultName = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'សិស្ស Java';
    const fallbackProfile: UserProfile = {
      id: authUser.id,
      email: authUser.email || '',
      displayName: defaultName,
      preferences: {
        theme: 'dark',
        editorFontSize: 14,
        soundEffects: true,
      },
    };

    if (!isSupabaseConfigured || !supabase) {
      return fallbackProfile;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (error || !data) {
        // If profile doesn't exist yet, insert a default one
        await supabase
          .from('user_profiles')
          .upsert({
            id: authUser.id,
            email: authUser.email,
            display_name: defaultName,
            theme: 'dark',
            editor_font_size: 14,
            sound_effects: true,
          })
          .maybeSingle();

        return fallbackProfile;
      }

      return {
        id: data.id,
        email: data.email || authUser.email || '',
        displayName: data.display_name || defaultName,
        avatarUrl: data.avatar_url,
        preferredLanguage: (data.preferred_language as 'km' | 'en') || 'km',
        preferences: {
          theme: (data.theme as 'dark' | 'light') || 'dark',
          editorFontSize: data.editor_font_size || 14,
          soundEffects: data.sound_effects !== false,
        },
        createdAt: data.created_at,
      };
    } catch (err) {
      console.warn('Error fetching user_profiles row:', err);
      return fallbackProfile;
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!rawUser) return;
    const profile = await fetchCloudProfile(rawUser);
    setUser(profile);
  }, [rawUser, fetchCloudProfile]);

  useEffect(() => {
    let isMounted = true;

    if (!isSupabaseConfigured || !supabase) {
      // Local Guest mode when Supabase is not configured
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

    // Step 1: Restore existing session
    supabase.auth
      .getSession()
      .then(async ({ data: { session }, error }) => {
        if (!isMounted) return;
        if (error) {
          console.warn('Supabase getSession error:', error.message);
          setRawUser(null);
          setUser(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          setRawUser(session.user);
          const profile = await fetchCloudProfile(session.user);
          if (isMounted) {
            setUser(profile);
          }
        }
        if (isMounted) setLoading(false);
      })
      .catch((err) => {
        console.warn('Session restoration failed:', err);
        if (isMounted) setLoading(false);
      });

    // Step 2: Listen for multi-device auth lifecycle events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (!isMounted) return;

      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'USER_UPDATED':
        case 'PASSWORD_RECOVERY':
          if (session?.user) {
            setRawUser(session.user);
            const profile = await fetchCloudProfile(session.user);
            if (isMounted) setUser(profile);
          }
          break;
        case 'SIGNED_OUT':
          setRawUser(null);
          setUser(null);
          break;
        default:
          break;
      }
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchCloudProfile]);

  // Step 3: Cross-device security listener - terminates session if password was changed on another device
  useEffect(() => {
    if (!user?.id || !isSupabaseConfigured || !supabase) return;

    const currentDeviceId = getDeviceId();
    const securityChannel = supabase
      .channel(`security-auth-${user.id}`)
      .on(
        'broadcast',
        { event: 'FORCE_LOGOUT_PASSWORD_CHANGED' },
        async (payload: any) => {
          if (payload?.payload?.senderDeviceId !== currentDeviceId) {
            // Password was changed on another device! Terminate this device immediately.
            await signOut({ scope: 'local' });
            alert(
              'ពាក្យសម្ងាត់គណនីរបស់អ្នកត្រូវបានផ្លាស់ប្តូរនៅលើឧបករណ៍មួយផ្សេងទៀត។ វគ្គនេះត្រូវបានបញ្ចប់។ សូមចូលគណនីម្តងទៀត។\n(Your password was updated on another device. Please sign in again with your new password.)'
            );
            window.location.href = '/auth';
          }
        }
      )
      .subscribe();

    return () => {
      if (supabase) supabase.removeChannel(securityChannel);
    };
  }, [user?.id]);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      const guest: UserProfile = {
        id: 'local-' + Date.now(),
        email,
        displayName: email.split('@')[0],
      };
      localStorage.setItem(LOCAL_GUEST_KEY, JSON.stringify(guest));
      setUser(guest);
      return { error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data?.user) {
      setRawUser(data.user);
      const profile = await fetchCloudProfile(data.user);
      setUser(profile);
    }
    return { error };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!isSupabaseConfigured || !supabase) {
      const guest: UserProfile = {
        id: 'local-' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0],
      };
      localStorage.setItem(LOCAL_GUEST_KEY, JSON.stringify(guest));
      setUser(guest);
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: displayName },
      },
    });

    if (!error && data?.user) {
      setRawUser(data.user);
      const profile = await fetchCloudProfile(data.user);
      setUser(profile);
    }
    return { error };
  };

  /**
   * Multi-Device Safe Sign Out
   * Defaults to scope: 'local' so signing out from this computer
   * does not prematurely end active sessions on the user's phone or tablet!
   */
  const signOut = async (options: SignOutOptions = { scope: 'local' }) => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut({ scope: options.scope || 'local' });
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    localStorage.removeItem(LOCAL_GUEST_KEY);
    setUser(null);
    setRawUser(null);
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: new Error('សូមកំណត់ Supabase URL និង Key ជាមុនសិន ដើម្បីប្រើមុខងារកំណត់ពាក្យសម្ងាត់ឡើងវិញតាមអ៊ីមែល។'),
      };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth?type=recovery',
    });
    return { error };
  };

  const updatePassword = async (newPassword: string): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: new Error('សូមកំណត់ Supabase URL និង Key ជាមុនសិន ដើម្បីប្រើមុខងារនេះ។'),
      };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: new Error(error.message) };

    const currentDeviceId = getDeviceId();
    const targetUserId = user?.id || rawUser?.id;

    // 1. Instantly broadcast security termination to all other open devices/tabs
    if (targetUserId) {
      try {
        const notifyChannel = supabase.channel(`security-auth-${targetUserId}`);
        await notifyChannel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await notifyChannel.send({
              type: 'broadcast',
              event: 'FORCE_LOGOUT_PASSWORD_CHANGED',
              payload: { senderDeviceId: currentDeviceId },
            });
            setTimeout(() => {
              if (supabase) supabase.removeChannel(notifyChannel);
            }, 1000);
          }
        });
      } catch (broadcastErr) {
        console.warn('Realtime security broadcast warning:', broadcastErr);
      }
    }

    // 2. Revoke all OTHER refresh tokens and sessions on the Supabase Auth server
    try {
      await supabase.auth.signOut({ scope: 'others' });
    } catch (err) {
      console.warn('Sign out others warning:', err);
    }

    return { error: null };
  };

  const updatePreferences = async (newPrefs: Partial<UserPreferences>): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('No authenticated user') };

    const mergedPrefs: UserPreferences = {
      ...(user.preferences || {}),
      ...newPrefs,
    };

    // Optimistic UI update
    setUser((prev) => (prev ? { ...prev, preferences: mergedPrefs } : null));

    if (isSupabaseConfigured && supabase && rawUser) {
      try {
        const { error } = await supabase
          .from('user_profiles')
          .update({
            theme: mergedPrefs.theme,
            editor_font_size: mergedPrefs.editorFontSize,
            sound_effects: mergedPrefs.soundEffects,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        return { error };
      } catch (err) {
        return { error: err as Error };
      }
    }

    return { error: null };
  };

  const updateDisplayName = async (newDisplayName: string): Promise<{ error: Error | null }> => {
    if (!user) return { error: new Error('No user found') };

    setUser((prev) => (prev ? { ...prev, displayName: newDisplayName } : null));

    if (isSupabaseConfigured && supabase && rawUser) {
      try {
        const { error } = await supabase
          .from('user_profiles')
          .update({
            display_name: newDisplayName,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        return { error };
      } catch (err) {
        return { error: err as Error };
      }
    }

    return { error: null };
  };

  const useGuestMode = () => {
    const guestUser: UserProfile = {
      id: 'guest-' + Math.floor(Math.random() * 10000),
      email: 'guest@khmerjava.academy',
      displayName: 'សិស្សស្វ័យសិក្សា (Guest)',
      preferences: {
        theme: 'dark',
        editorFontSize: 14,
        soundEffects: true,
      },
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
        updatePassword,
        updatePreferences,
        updateDisplayName,
        useGuestMode,
        refreshProfile,
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
