import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Determine if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

let supabase: SupabaseClient;

// Only initialize Supabase in the browser
if (isBrowser) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        'Supabase URL or Anon Key is missing in environment variables'
      );

      // Create a dummy client that does nothing
      supabase = {
        auth: {
          getSession: () =>
            Promise.resolve({ data: { session: null }, error: null }),
          signInWithPassword: () =>
            Promise.resolve({ data: null, error: new Error('Not configured') }),
          signOut: () => Promise.resolve({ error: null }),
          updateUser: () =>
            Promise.resolve({ data: null, error: new Error('Not configured') }),
          resetPasswordForEmail: () =>
            Promise.resolve({ data: null, error: new Error('Not configured') }),
        },
        functions: {
          invoke: () =>
            Promise.resolve({
              data: { data: null },
              error: new Error('Not configured'),
            }),
          setAuth: () => {},
        },
      } as unknown as SupabaseClient;
    } else {
      // Create actual Supabase client
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        db: { schema: 'public' },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        },
      });
      console.log('Supabase client initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    // Create a fallback dummy client
    supabase = {
      auth: {
        getSession: () =>
          Promise.resolve({ data: { session: null }, error: null }),
      },
      functions: {
        invoke: () =>
          Promise.resolve({
            data: { data: null },
            error: new Error('Client failed to initialize'),
          }),
      },
    } as unknown as SupabaseClient;
  }
} else {
  // For SSR/SSG, create a dummy client
  supabase = {
    auth: {
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
    },
    functions: {
      invoke: () => Promise.resolve({ data: { data: null }, error: null }),
    },
  } as unknown as SupabaseClient;
  console.log('Using mock Supabase client for SSR/SSG');
}

export { supabase };
