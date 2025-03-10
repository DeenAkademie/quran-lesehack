'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Home,
  BookOpen,
  Video,
  FileQuestion,
  LogOut,
  Info,
  Menu,
  LogIn,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Menu items for authenticated users
  const authenticatedMenuItems = [
    { href: '/', label: 'Home', icon: <Home className='h-5 w-5' /> },
    {
      href: '/lektionen',
      label: 'Your courses',
      icon: <BookOpen className='h-5 w-5' />,
    },
    { href: '/videos', label: 'Videos', icon: <Video className='h-5 w-5' /> },
    {
      href: '/quizzes',
      label: 'Quizzes',
      icon: <FileQuestion className='h-5 w-5' />,
    },
    { href: '/logout', label: 'Logout', icon: <LogOut className='h-5 w-5' /> },
    { href: '/about', label: 'About us', icon: <Info className='h-5 w-5' /> },
  ];

  // Menu items for unauthenticated users
  const unauthenticatedMenuItems = [
    { href: '/login', label: 'Login', icon: <LogIn className='h-5 w-5' /> },
    { href: '/about', label: 'About us', icon: <Info className='h-5 w-5' /> },
  ];

  // Choose menu items based on authentication status
  const menuItems = user ? authenticatedMenuItems : unauthenticatedMenuItems;

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <input
        type='checkbox'
        id='toggle-menu'
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
        className='hidden'
      />
      <label htmlFor='toggle-menu' className='expand-menu'>
        <Menu className='h-5 w-5' />
      </label>

      <nav
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#4AA4DE] text-white shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 z-40 ${
          isMenuOpen ? 'translate-x-0' : ''
        } ${className}`}
      >
        {/* Deen Akademie logo */}
        <div className='p-4 flex items-center justify-center mb-6'>
          <div className='bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center'>
            <Image
              src='/img/logo.png'
              alt='Deen Akademie Logo'
              width={30}
              height={30}
              priority
            />
          </div>
          <div className='ml-2'>
            <div className='text-white font-bold'>Deen</div>
            <div className='text-white text-sm'>Akademie</div>
          </div>
        </div>

        <ul className='space-y-1 px-2'>
          {menuItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavigation(item.href)}
                className='flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors text-white w-full text-left'
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
