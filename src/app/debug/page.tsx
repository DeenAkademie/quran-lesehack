'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EnvironmentInfo } from '@/components/environment-info';

export default function DebugPage() {
  const [cookies, setCookies] = useState<string>('');
  const [localStorage, setLocalStorage] = useState<string>('');
  const [renderCount, setRenderCount] = useState(0);

  // Zähle die Anzahl der Renders
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  // Hole die Cookies
  useEffect(() => {
    setCookies(document.cookie);
  }, []);

  // Hole den localStorage
  useEffect(() => {
    try {
      const items: Record<string, string> = {};
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) {
          items[key] = window.localStorage.getItem(key) || '';
        }
      }
      setLocalStorage(JSON.stringify(items, null, 2));
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setLocalStorage('Error accessing localStorage');
    }
  }, []);

  // Funktion zum Löschen aller Cookies
  const clearCookies = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    setCookies('');
    alert('Alle Cookies wurden gelöscht');
  };

  // Funktion zum Löschen des localStorage
  const clearLocalStorage = () => {
    try {
      window.localStorage.clear();
      setLocalStorage('{}');
      alert('LocalStorage wurde gelöscht');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      alert('Fehler beim Löschen des LocalStorage');
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Debug-Seite</h1>

      {/* Umgebungsinformationen */}
      <div className='mb-6'>
        <EnvironmentInfo />
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Render-Zähler</h2>
        <p>Diese Seite wurde {renderCount} mal gerendert.</p>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Cookies</h2>
        <pre className='bg-gray-100 p-4 rounded overflow-auto max-h-40'>
          {cookies || 'Keine Cookies gefunden'}
        </pre>
        <Button
          onClick={clearCookies}
          className='mt-2 bg-red-500 hover:bg-red-600'
        >
          Alle Cookies löschen
        </Button>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>LocalStorage</h2>
        <pre className='bg-gray-100 p-4 rounded overflow-auto max-h-40'>
          {localStorage || 'Kein LocalStorage gefunden'}
        </pre>
        <Button
          onClick={clearLocalStorage}
          className='mt-2 bg-red-500 hover:bg-red-600'
        >
          LocalStorage löschen
        </Button>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Navigation</h2>
        <div className='flex space-x-2'>
          <Button
            onClick={() => (window.location.href = '/')}
            className='bg-blue-500 hover:bg-blue-600'
          >
            Zur Startseite
          </Button>
          <Button
            onClick={() => (window.location.href = '/login')}
            className='bg-green-500 hover:bg-green-600'
          >
            Zur Login-Seite
          </Button>
        </div>
      </div>
    </div>
  );
}
