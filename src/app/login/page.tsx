'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';

// Einfache statische Login-Seite
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { login, isLoading } = useAuth();

  // Verbesserte Anmeldefunktion mit Schutz gegen mehrfache Aufrufe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verhindere mehrfache Anmeldeversuche
    if (isSubmitting || isLoading) return;

    setIsSubmitting(true);
    setError('');

    try {
      await login(email);

      // Kurze Verzögerung, um sicherzustellen, dass der Store aktualisiert wurde
      setTimeout(() => {
        router.push('/');
      }, 100);
    } catch (error) {
      console.error('Login error:', error);
      setError('Anmeldung fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-1 text-center'>Login</h1>
      <p className='text-gray-500 mb-6 text-center'>
        Bitte gib deine E-Mail-Adresse ein, um dich anzumelden.
      </p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='deine@email.de'
            required
            className='w-full'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Passwort</Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='••••••••'
            required
            className='w-full'
          />
        </div>

        {error && <div className='text-red-500 text-sm'>{error}</div>}

        <Button
          type='submit'
          className='w-full bg-[#4AA4DE] hover:bg-[#3993CD]'
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Anmeldung...' : 'Anmelden'}
        </Button>

        <div className='text-center mt-4'>
          <Link
            href='/forgot-password'
            className='text-[#4AA4DE] hover:underline text-sm'
          >
            Passwort vergessen?
          </Link>
        </div>
      </form>
    </div>
  );
}
