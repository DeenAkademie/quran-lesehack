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
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Menüpunkte für angemeldete Benutzer
  const authenticatedMenuItems = [
    { href: '/', label: 'Startseite', icon: <Home className='h-5 w-5' /> },
    {
      href: '/lektionen',
      label: 'Deine Kurse',
      icon: <BookOpen className='h-5 w-5' />,
    },
    { href: '/videos', label: 'Videos', icon: <Video className='h-5 w-5' /> },
    {
      href: '/qsk-light',
      label: 'QSK-Light',
      icon: <GraduationCap className='h-5 w-5' />,
    },
    {
      href: '/quizzes',
      label: 'Übungen',
      icon: <FileQuestion className='h-5 w-5' />,
    },
    {
      href: '/logout',
      label: 'Abmelden',
      icon: <LogOut className='h-5 w-5' />,
    },
    { href: '/about', label: 'Über uns', icon: <Info className='h-5 w-5' /> },
  ];

  // Menüpunkte für nicht angemeldete Benutzer
  const unauthenticatedMenuItems = [
    { href: '/login', label: 'Anmelden', icon: <LogIn className='h-5 w-5' /> },
    { href: '/about', label: 'Über uns', icon: <Info className='h-5 w-5' /> },
  ];

  // Wähle Menüpunkte basierend auf dem Authentifizierungsstatus
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
        {/* Deen Akademie Logo */}
        <div className='p-4 flex items-center justify-start mb-6'>
          <div className='rounded-full p-2 flex items-center justify-center'>
            <Image
              src='/deen-logo.png'
              alt='Deen Akademie Logo'
              width={60}
              height={60}
              priority
            />
          </div>
          <div className='ml-2'>
            <div className='text-white text-xl font-bold'>Deen</div>
            <div className='text-white text-xl '>Akademie</div>
          </div>
        </div>

        <ul className='space-y-1 px-2'>
          {menuItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavigation(item.href)}
                className='flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors text-white w-full text-left cursor-pointer'
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
