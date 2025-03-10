'use client';

import { useState, useEffect, ReactNode, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface LightboxProps {
  type: 'info' | 'confirm';
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  submitLink?: string;
  children?: ReactNode;
}

export function Lightbox({
  type = 'info',
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  submitLink,
  children
}: LightboxProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    if (!submitLink) {
      e.preventDefault();
      onConfirm?.();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black-opaque transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <form 
        action={submitLink} 
        method="post"
        className="w-full max-w-md mx-4"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={onClose}
            >
              X
            </Button>
          </CardHeader>
          <CardContent>
            <p className="font-small mb-5">{message}</p>
            {type === 'confirm' && (
              <p className="font-small mb-5">Bist du sicher?</p>
            )}
            {children}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {type === 'confirm' ? (
              <>
                <Button type="button" variant="outline" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button type="submit">
                  OK
                </Button>
              </>
            ) : (
              <Button type="button" onClick={onClose}>
                OK
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
} 