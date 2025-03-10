import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from '@/components/main-nav';
import { AuthProvider } from '@/context/auth-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quran LeseHack - Lerne den Quran in 28 Lektionen',
  description:
    'Eine Quran-Lernapp, mit der du den Quran in 28 Lektionen lernen kannst, basierend auf den 28 arabischen Buchstaben.',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      {
        url: '/favicon/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: '/favicon/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        url: '/favicon/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon/ms-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex`}
      >
        <AuthProvider>
          <MainNav />
          <main className='flex-1 bg-white'>
            <div className='max-w-[1200px] mx-auto'>{children}</div>
          </main>
          <div id='lightbox-container' className='hidden'></div>
          <audio id='mp3-player' className='hidden'></audio>
        </AuthProvider>
      </body>
    </html>
  );
}
