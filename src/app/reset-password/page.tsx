'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updatePassword } from '@/api/api';
import { toast } from 'sonner';
import { supabase } from '@/api/supabase_client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  // Überprüfe, ob der Benutzer über einen gültigen Reset-Link kommt
  useEffect(() => {
    const checkSession = async () => {
      // Supabase setzt automatisch die Session, wenn der Benutzer über einen gültigen Reset-Link kommt
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        toast.error(
          'Ungültiger oder abgelaufener Reset-Link. Bitte fordere einen neuen an.'
        );
        router.push('/forgot-password');
        return;
      }

      setIsReady(true);
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validierung
    if (password.length < 8) {
      toast.error('Das Passwort muss mindestens 8 Zeichen lang sein.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Die Passwörter stimmen nicht überein.');
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(password);
      toast.success(
        'Passwort erfolgreich zurückgesetzt. Du kannst dich jetzt anmelden.'
      );

      // Kurze Verzögerung, damit der Benutzer die Erfolgsmeldung sehen kann
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Fehler beim Zurücksetzen des Passworts:', error);
      toast.error(
        'Fehler beim Zurücksetzen des Passworts. Bitte versuche es später erneut.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className='p-6 flex justify-center items-center min-h-[50vh]'>
        <p>Überprüfe Reset-Link...</p>
      </div>
    );
  }

  return (
    <div className='p-6 flex justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Neues Passwort festlegen</CardTitle>
          <CardDescription>
            Gib dein neues Passwort ein. Das Passwort muss mindestens 8 Zeichen
            lang sein.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='password'>Neues Passwort</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Neues Passwort'
                required
                minLength={8}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Passwort bestätigen</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Passwort bestätigen'
                required
                minLength={8}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Wird zurückgesetzt...' : 'Passwort zurücksetzen'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
