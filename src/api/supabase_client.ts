import { createClient } from '@supabase/supabase-js';

// Stelle sicher, dass die Umgebungsvariablen nicht leer sind
// Entferne Anführungszeichen, falls sie in der Umgebungsvariable enthalten sind
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/['"]/g, '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(
  /['"]/g,
  ''
);

// Erstelle einen Mock-Client für die Entwicklung, wenn keine Umgebungsvariablen vorhanden sind
const createMockClient = () => {
  if (typeof window !== 'undefined') {
    console.error(
      'Supabase Umgebungsvariablen fehlen oder sind ungültig. Ein Mock-Client wird verwendet.'
    );
  }

  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () =>
        Promise.resolve({
          data: null,
          error: new Error('Mock-Client: Keine Authentifizierung möglich'),
        }),
      signOut: () => Promise.resolve({ error: null }),
    },
    functions: {
      invoke: () =>
        Promise.resolve({
          data: { data: null },
          error: new Error('Mock-Client: Keine Funktionsaufrufe möglich'),
        }),
      setAuth: () => {},
    },
  };
};

// Prüfe, ob die URLs gültig sind
const isValidUrl = (url: string | undefined): boolean => {
  try {
    if (!url) return false;
    // Teste, ob die URL gültig ist
    new URL(url);
    return true;
  } catch (e) {
    if (typeof window !== 'undefined') {
      console.error('Ungültige URL:', url, e);
    }
    return false;
  }
};

// Improved Edge Runtime detection
const isEdgeRuntime =
  typeof process !== 'undefined' &&
  typeof process.env !== 'undefined' &&
  typeof process.env.NEXT_RUNTIME === 'string' &&
  process.env.NEXT_RUNTIME === 'edge';

// Create a dummy client for Edge Runtime to prevent errors
const createEdgeClient = () => {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () =>
        Promise.resolve({
          data: null,
          error: new Error('Edge Runtime: Auth operations not supported'),
        }),
      signOut: () => Promise.resolve({ error: null }),
    },
    functions: {
      invoke: () =>
        Promise.resolve({
          data: { data: null },
          error: new Error('Edge Runtime: Function calls not supported'),
        }),
      setAuth: () => {},
    },
  };
};

// Export the appropriate client based on the runtime environment
export const supabase = isEdgeRuntime
  ? createEdgeClient()
  : isValidUrl(supabaseUrl) && supabaseAnonKey
  ? createClient(supabaseUrl as string, supabaseAnonKey, {
      db: { schema: 'da_qsk_reading' },
    })
  : createMockClient();
