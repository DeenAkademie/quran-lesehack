'use client';

import { useEffect, useState } from 'react';

export function EnvironmentInfo() {
  const [environment, setEnvironment] = useState<string>('');

  useEffect(() => {
    // Im Client-seitigen Code können wir auf process.env.NODE_ENV zugreifen
    setEnvironment(process.env.NODE_ENV || 'unbekannt');
  }, []);

  return (
    <div className='p-4 bg-gray-100 rounded-md mb-4'>
      <h3 className='font-medium mb-2'>Umgebungsinformationen</h3>
      <p>
        <strong>Modus:</strong> {environment}
      </p>
      <p className='text-xs text-gray-500 mt-2'>
        {environment === 'development'
          ? 'Die Anwendung läuft im Entwicklungsmodus mit Hot Reloading und Debugging-Funktionen.'
          : 'Die Anwendung läuft im Produktionsmodus mit optimierter Performance.'}
      </p>
    </div>
  );
}
