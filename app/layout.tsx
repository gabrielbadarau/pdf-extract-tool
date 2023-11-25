import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDF Extract Data Tool',
  description: 'PDF Extract Data Tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
