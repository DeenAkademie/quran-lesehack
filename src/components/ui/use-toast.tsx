'use client';

import * as React from 'react';
import { X } from 'lucide-react';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
  onClose?: () => void;
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
}>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>(
    []
  );

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).slice(2, 11);
    setToasts((prev) => [...prev, { ...props, id }]);

    // Automatisch nach 5 Sekunden entfernen
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const closeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className='fixed top-4 right-4 z-50 flex flex-col items-end space-y-2'>
        {toasts.map(
          ({
            id,
            title,
            description,
            variant = 'default',
            onClose,
            ...props
          }) => (
            <div
              key={id}
              className={`rounded-lg shadow-lg p-4 w-80 transform translate-x-0 bg-white border ${
                variant === 'success'
                  ? 'border-green-500'
                  : variant === 'error'
                  ? 'border-red-500'
                  : 'border-gray-200'
              }`}
              role='alert'
              {...props}
            >
              <div className='flex justify-between items-start'>
                <div>
                  {title && (
                    <h4 className='font-semibold text-gray-900'>{title}</h4>
                  )}
                  {description && (
                    <p className='text-sm text-gray-500'>{description}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    closeToast(id);
                    if (onClose) onClose();
                  }}
                  className='text-gray-400 hover:text-gray-500 ml-2'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const toast = (props: ToastProps) => {
  if (typeof window !== 'undefined') {
    // Verzögere den Aufruf, um sicherzustellen, dass der Kontext bereits verfügbar ist
    setTimeout(() => {
      try {
        const context = React.useContext(ToastContext);
        if (context) {
          context.toast(props);
        }
      } catch (e) {
        console.error('Error showing toast:', e);
      }
    }, 0);
  }
};
