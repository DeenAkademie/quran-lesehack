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
  console.error(
    'Supabase Umgebungsvariablen fehlen oder sind ungültig. Ein Mock-Client wird verwendet.'
  );

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
    console.error('Ungültige URL:', url, e);
    return false;
  }
};

// Erstelle den Supabase-Client nur, wenn gültige Umgebungsvariablen vorhanden sind
export const supabase =
  isValidUrl(supabaseUrl) && supabaseAnonKey
    ? createClient(supabaseUrl as string, supabaseAnonKey, {
        db: { schema: 'da_qsk_reading' },
      })
    : createMockClient();
