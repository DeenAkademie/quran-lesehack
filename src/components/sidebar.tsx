import {
  Home,
  BookOpen,
  BarChart,
  Settings,
  Users,
  UserPlus,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/',
    color: 'text-sky-500',
  },
  {
    label: 'Lektionen',
    icon: BookOpen,
    href: '/lektionen',
    color: 'text-violet-500',
  },
  {
    label: 'Übungen',
    icon: BarChart,
    href: '/quizzes',
    color: 'text-pink-700',
  },
  {
    label: 'Benutzer',
    icon: Users,
    href: '/admin/users',
    color: 'text-orange-700',
  },
  {
    label: 'Neuer Benutzer',
    icon: UserPlus,
    href: '/admin/users/new',
    color: 'text-emerald-500',
  },
  {
    label: 'Einstellungen',
    icon: Settings,
    href: '/settings',
    color: 'text-gray-700',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-white text-gray-800 border-r'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/' className='flex items-center pl-3 mb-8'>
          <div className='relative w-8 h-8 mr-4'>
            <Image fill alt='Logo' src='/logo.png' />
          </div>
          <h1 className='text-2xl font-bold'>Quran LeseHack</h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`
                text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-gray-100 rounded-lg transition
                ${pathname === route.href ? 'bg-gray-100' : ''}
              `}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
