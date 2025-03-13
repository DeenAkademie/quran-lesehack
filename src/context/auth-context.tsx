'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { setCookie, deleteCookie } from 'cookies-next';
import { useAuthStore } from '@/hooks/use-auth-store';
import { signIn, signOut } from '@/api/api';
import { supabase } from '@/api/supabase_client';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: storeUser, isLoading, updateUser, clearUser } = useAuthStore();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Beim ersten Laden prüfen, ob der Benutzer bereits angemeldet ist
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          // Benutzer ist angemeldet, aktualisiere den Store
          const { user } = data.session;

          if (user) {
            updateUser({
              id: user.id,
              email: user.email || '',
              // Weitere Benutzerinformationen können hier hinzugefügt werden
            });

            // Cookie setzen für die Middleware
            setCookie('auth', 'authenticated', {
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: '/',
            });
          }
        }
      } catch {
        // Fehler beim Überprüfen der Sitzung
        setInitialCheckDone(true);
      } finally {
        setInitialCheckDone(true);
      }
    };

    checkSession();
  }, [updateUser]);

  // Konvertiere den TanStack-Benutzer in das Format, das der AuthContext erwartet
  const contextUser: User | null =
    storeUser?.email && storeUser?.id
      ? {
          id: storeUser.id,
          email: storeUser.email,
          firstName: storeUser.firstName,
          lastName: storeUser.lastName,
          userName: storeUser.userName,
        }
      : null;

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Verwende die signIn-Funktion aus der API
      const data = await signIn(email, password);

      if (!data || !data.user) {
        throw new Error('Login fehlgeschlagen');
      }

      // Set a cookie for the middleware to check
      setCookie('auth', 'authenticated', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      // Aktualisiere den Benutzer im TanStack Store
      updateUser({
        id: (data.user as { id?: string }).id || '',
        email: (data.user as { email?: string }).email || email,
        // Weitere Benutzerinformationen können hier hinzugefügt werden
      });
    } catch {
      // Fehlerbehandlung für Login
      throw new Error('Login fehlgeschlagen');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Verwende die signOut-Funktion aus der API
      await signOut();

      // Lösche den Cookie
      deleteCookie('auth');

      // Lösche den Benutzer im TanStack Store
      clearUser();
    } catch {
      // Fehlerbehandlung für Logout
      throw new Error('Logout fehlgeschlagen');
    }
  };

  // Zeige nichts an, bis die erste Sitzungsprüfung abgeschlossen ist
  if (!initialCheckDone) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user: contextUser,
        isLoading,
        login,
        logout,
      }}
    >
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
