/** @format */

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

import Providers from './providers';

export const metadata = {
  title: 'Kong Fu Kitchen - Menu Management System',
  description: 'Restaurant menu editing and display system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='zh-CN'
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
