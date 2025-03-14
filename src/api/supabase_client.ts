import { createClient } from '@supabase/supabase-js';

// Stelle sicher, dass die Umgebungsvariablen nicht leer sind
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Überprüfe, ob die erforderlichen Umgebungsvariablen vorhanden sind
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL und Anon Key müssen in den Umgebungsvariablen definiert sein.'
  );
}

// Erstelle den Supabase-Client mit dem korrekten Schema
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'da_qsk_reading' },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});
