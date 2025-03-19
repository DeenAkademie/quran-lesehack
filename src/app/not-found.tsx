import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4'>
      <h2 className='text-3xl font-bold mb-4'>404 - Seite nicht gefunden</h2>
      <p className='text-gray-600 mb-6 text-center'>
        Die angeforderte Seite konnte nicht gefunden werden.
      </p>
      <Link
        href='/'
        className='px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors'
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
