'use client';

import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function LocaleLayoutClient({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
