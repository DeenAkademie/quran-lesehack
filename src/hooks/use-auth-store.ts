'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/api/types/api_types';

// Typdefinition für den Benutzer
interface UserStore {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar?: string;
  badges: Badge[];
}

// Standardwerte für den Benutzer
const defaultUser: UserStore = {
  id: '',
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  avatar: undefined,
  badges: [],
};

// Lokalen Benutzer aus dem localStorage abrufen
const getLocalUser = (): UserStore => {
  if (typeof window === 'undefined') return defaultUser;

  try {
    const stored = localStorage.getItem('user-store');
    return stored ? JSON.parse(stored) : defaultUser;
  } catch (error) {
    console.error('Failed to parse user from localStorage', error);
    return defaultUser;
  }
};

// Lokalen Benutzer im localStorage speichern
const setLocalUser = (user: UserStore): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user-store', JSON.stringify(user));
};

// Prüfen, ob der Benutzer authentifiziert ist
const checkAuthentication = (): boolean => {
  // Prüfe auf den auth-Cookie
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('auth=')
    );
    return !!authCookie;
  }
  return false;
};

export function useAuthStore() {
  const queryClient = useQueryClient();

  // Query für den Benutzer
  const { data: user = defaultUser, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getLocalUser,
    staleTime: Infinity,
  });

  // Query für den Authentifizierungsstatus
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: () => checkAuthentication(),
    // Konfiguration für optimale Leistung
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  // Mutation zum Aktualisieren des Benutzers
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (newUser: Partial<UserStore>) => {
      const updatedUser = { ...user, ...newUser };
      setLocalUser(updatedUser);
      return Promise.resolve(updatedUser);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.setQueryData(['isAuthenticated'], true);
    },
  });

  // Mutation zum Löschen des Benutzers (Logout)
  const { mutate: clearUser, isPending: isClearing } = useMutation({
    mutationFn: () => {
      localStorage.removeItem('user-store');
      return Promise.resolve(null);
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], defaultUser);
      queryClient.setQueryData(['isAuthenticated'], false);
    },
  });

  const isLoading = isUserLoading || isAuthLoading || isUpdating || isClearing;

  return {
    user,
    isAuthenticated,
    isLoading,
    updateUser,
    clearUser,
  };
}
