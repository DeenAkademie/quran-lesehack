'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { setCookie, deleteCookie } from 'cookies-next';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        deleteCookie('auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // In a real app, this would validate credentials with an API
    // For now, we'll just simulate a successful login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));

    // Set a cookie for the middleware to check
    setCookie('auth', 'authenticated', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    deleteCookie('auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
