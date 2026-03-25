'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';

export default function LoginForm() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: 'john@example.com',
    password: 'password123',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
      router.push(`/${locale}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.resetPasswordError'));
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border p-8">
          <h1 className="mb-2 text-center text-3xl font-bold">{t('auth.login')}</h1>
          <p className="text-muted-foreground mb-8 text-center">
            {t('auth.login')} to your DRIPCODE account
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive mb-6 rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">{t('auth.email')}</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
              <p className="text-muted-foreground mt-1 text-xs">Demo: john@example.com</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('auth.password')}</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-muted-foreground mt-1 text-xs">Demo: password123</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                {t('auth.rememberMe')}
              </label>
              <Link
                href={`/${locale}/auth/forgot-password`}
                className="text-primary hover:underline"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? `${t('common.loading')}` : t('auth.loginButton')}
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            {t('auth.noAccount')}{' '}
            <Link
              href={`/${locale}/auth/register`}
              className="text-primary font-medium hover:underline"
            >
              {t('auth.signUpHere')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
