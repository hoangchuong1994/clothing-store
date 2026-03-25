'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordForm() {
  const locale = useLocale();
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border p-8">
          <h1 className="mb-2 text-center text-3xl font-bold">{t('auth.forgotPassword')}</h1>
          <p className="text-muted-foreground mb-8 text-center">
            {t('auth.resetPasswordDescription')}
          </p>

          {sent ? (
            <div className="mb-8 rounded-lg bg-green-100 p-4 text-center text-green-800">
              <p className="font-medium">{t('auth.resetPasswordSuccess')}</p>
              <p className="mt-1 text-sm">Check your email for password reset instructions</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">{t('auth.email')}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t('auth.sendLink')}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/auth/login`}
              className="text-primary text-sm font-medium hover:underline"
            >
              {t('auth.backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
