import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/contexts/theme-context';

import LocaleLayoutClient from './layout-client';

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;

  return {
    title: `DRIPCODE - Premium Streetwear Fashion Store`,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <AuthProvider>
          <LocaleLayoutClient>{children}</LocaleLayoutClient>
        </AuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
