import { createClient } from '@supabase/supabase-js';

// Stelle sicher, dass die Umgebungsvariablen nicht leer sind
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Erstelle eine Funktion, die den Supabase-Client erstellt, um lazy loading zu ermöglichen
const createSupabaseClient = () => {
  // Überprüfe, ob die erforderlichen Umgebungsvariablen vorhanden sind
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      'Supabase URL und Anon Key müssen in den Umgebungsvariablen definiert sein.'
    );
    // Return a mock client for SSG
    if (typeof window === 'undefined') {
      return {} as ReturnType<typeof createClient>;
    }
    throw new Error(
      'Supabase URL und Anon Key müssen in den Umgebungsvariablen definiert sein.'
    );
  }

  // Erstelle den Supabase-Client mit dem korrekten Schema
  return createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'public' },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
};

// Erstelle den Client nur, wenn er benötigt wird (nicht während des Build-Prozesses)
export const supabase = createSupabaseClient();
