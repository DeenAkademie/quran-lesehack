'use client';

import { createContext, useContext, ReactNode } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';
import { useAuthStore } from '@/hooks/use-auth-store';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoading, updateUser, clearUser } = useAuthStore();

  // Konvertiere den TanStack-Benutzer in das Format, das der AuthContext erwartet
  const contextUser = user?.email ? { email: user.email } : null;

  const login = async (email: string) => {
    try {
      // In a real app, this would validate credentials with an API
      // For now, we'll just simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Set a cookie for the middleware to check
      setCookie('auth', 'authenticated', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      // Aktualisiere den Benutzer im TanStack Store
      updateUser({ email });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Lösche den Cookie
    deleteCookie('auth');

    // Lösche den Benutzer im TanStack Store
    clearUser();
  };

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
