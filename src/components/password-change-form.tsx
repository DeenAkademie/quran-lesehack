'use client';

import { useState } from 'react';
import { updatePassword } from '@/api/api';
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
import { toast } from 'sonner';

export function PasswordChangeForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      toast.success('Passwort erfolgreich geändert.');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Fehler beim Ändern des Passworts:', error);
      toast.error(
        'Fehler beim Ändern des Passworts. Bitte versuche es später erneut.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passwort ändern</CardTitle>
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
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Wird geändert...' : 'Passwort ändern'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
