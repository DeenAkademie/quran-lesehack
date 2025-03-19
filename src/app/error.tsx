'use client';

import Link from 'next/link';

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-primary mb-2'>Fehler</h1>
        <h2 className='text-2xl font-semibold mb-6'>
          Etwas ist schiefgelaufen
        </h2>
        <p className='text-gray-600 mb-8 max-w-md mx-auto'>
          Es tut uns leid, aber beim Laden dieser Seite ist ein Fehler
          aufgetreten.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={reset}
            className='px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors'
          >
            Erneut versuchen
          </button>
          <Link
            href='/'
            className='px-6 py-3 border border-gray-300 bg-white rounded-md hover:bg-gray-50 transition-colors'
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
