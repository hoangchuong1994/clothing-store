import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DRIPCODE - Premium Streetwear Fashion Store',
  description:
    'Premium streetwear for the bold and brave. Shop exclusive drops, latest collections, and limited edition pieces. Modern style meets dynamic fashion.',
  keywords: 'streetwear, fashion, clothing, urban style, drops, limited edition',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white text-black transition-colors dark:bg-gray-950 dark:text-white">
        {children}
      </body>
    </html>
  );
}
