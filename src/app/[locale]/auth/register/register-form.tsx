'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';

export default function RegisterForm() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.resetPasswordError'));
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      router.push(`/${locale}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.resetPasswordError'));
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border p-8">
          <h1 className="mb-2 text-center text-3xl font-bold">{t('auth.register')}</h1>
          <p className="text-muted-foreground mb-8 text-center">
            {t('auth.register')} and start shopping
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive mb-6 rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">{t('auth.fullName')}</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('auth.email')}</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
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
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">{t('auth.confirmPassword')}</label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded" required />
              <span className="text-muted-foreground">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? `${t('common.loading')}` : t('auth.registerButton')}
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            {t('auth.haveAccount')}{' '}
            <Link
              href={`/${locale}/auth/login`}
              className="text-primary font-medium hover:underline"
            >
              {t('auth.loginHere')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
