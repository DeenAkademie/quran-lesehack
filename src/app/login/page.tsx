'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/');
    } catch (_) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-1'>Login</h1>
      <p className='text-gray-500 mb-6'>Please login.</p>

      <form
        onSubmit={handleSubmit}
        className='space-y-4'
        suppressHydrationWarning
      >
        <div className='space-y-2'>
          <Label htmlFor='email'>
            Email: <span className='text-red-500'>*</span>
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

        <div className='space-y-2'>
          <Label htmlFor='password'>
            Password: <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full'
            suppressHydrationWarning
          />
        </div>

        {error && <div className='text-red-500 text-sm'>{error}</div>}

        <div className='flex flex-col items-center space-y-4'>
          <Button
            type='submit'
            className='w-32 bg-[#4AA4DE] hover:bg-[#3993CD]'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <Link
            href='/forgot-password'
            className='text-[#4AA4DE] hover:underline text-sm'
          >
            Forgotten password
          </Link>
        </div>
      </form>
    </div>
  );
}
