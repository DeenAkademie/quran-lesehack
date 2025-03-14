'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/api/api';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Bestimme die Redirect-URL basierend auf der aktuellen Umgebung
      const baseUrl =
        typeof window !== 'undefined'
          ? `${window.location.protocol}//${window.location.host}`
          : '';
      const redirectTo = `${baseUrl}/reset-password`;

      // Sende die Passwort-Reset-E-Mail
      await resetPassword(email, redirectTo);
      setIsSubmitted(true);
      toast.success('Passwort-Reset-E-Mail wurde gesendet!');
    } catch (error) {
      console.error('Fehler beim Zurücksetzen des Passworts:', error);
      toast.error(
        'Fehler beim Senden der Passwort-Reset-E-Mail. Bitte versuche es später erneut.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-1'>Passwort vergessen</h1>
      <p className='text-gray-500 mb-6'>
        Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen.
      </p>

      {isSubmitted ? (
        <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4'>
          <p>
            Passwort-Reset-E-Mail wurde gesendet! Bitte überprüfe deinen
            Posteingang.
          </p>
          <div className='mt-4'>
            <Link href='/login' className='text-[#4AA4DE] hover:underline'>
              Zurück zur Anmeldung
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
          suppressHydrationWarning
        >
          <div className='space-y-2'>
            <Label htmlFor='email'>
              E-Mail: <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full'
              suppressHydrationWarning
            />
          </div>

          <div className='flex flex-col items-center space-y-4'>
            <Button
              type='submit'
              className='w-full bg-[#4AA4DE] hover:bg-[#3993CD]'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird gesendet...' : 'Passwort zurücksetzen'}
            </Button>

            <Link
              href='/login'
              className='text-[#4AA4DE] hover:underline text-sm'
            >
              Zurück zur Anmeldung
            </Link>
          </div>
        </form>
      )}
    </div>
  );
} 