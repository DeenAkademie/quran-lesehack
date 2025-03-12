'use client';

import { useAuthStore } from '@/hooks/use-auth-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AuthStatus() {
  const { user, isAuthenticated, clearUser } = useAuthStore();

  const handleLogout = () => {
    clearUser();
  };

  if (!isAuthenticated) {
    return (
      <div className='flex items-center gap-2'>
        <span className='text-sm text-muted-foreground'>Nicht angemeldet</span>
        <Button variant='outline' size='sm' asChild>
          <a href='/login'>Anmelden</a>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src={user.avatar} alt={user.userName} />
        <AvatarFallback>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{user.userName}</span>
        <span className='text-xs text-muted-foreground'>{user.email}</span>
      </div>
      <Button variant='ghost' size='sm' onClick={handleLogout}>
        Abmelden
      </Button>
    </div>
  );
}
