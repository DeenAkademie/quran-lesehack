import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-primary mb-2'>404</h1>
        <h2 className='text-2xl font-semibold mb-6'>Seite nicht gefunden</h2>
        <p className='text-gray-600 mb-8 max-w-md mx-auto'>
          Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href='/'
          className='inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors'
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
