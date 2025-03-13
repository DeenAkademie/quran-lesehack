'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // In a real app, this would be a call to your password reset API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Forgot Password</h1>
      <p className="text-gray-500 mb-6">Enter your email to reset your password.</p>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4">
          <p>Password reset email sent! Please check your inbox.</p>
          <div className="mt-4">
            <Link href="/login" className="text-[#4AA4DE] hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email: <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              suppressHydrationWarning
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex flex-col items-center space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-[#4AA4DE] hover:bg-[#3993CD]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Reset Password'}
            </Button>
            
            <Link 
              href="/login" 
              className="text-[#4AA4DE] hover:underline text-sm"
            >
              Back to login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
} 