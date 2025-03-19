'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4'>
      <h2 className='text-3xl font-bold mb-4'>Ein Fehler ist aufgetreten</h2>
      <p className='text-gray-600 mb-6 text-center'>
        Es tut uns leid, aber etwas ist schiefgelaufen.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <button
          onClick={reset}
          className='px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors'
        >
          Erneut versuchen
        </button>
        <Link
          href='/'
          className='px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-center'
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
