'use client';

import { Mail, Edit, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/context/auth-context';

export default function UserProfile() {
  const t = useTranslations();
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-0">
      <h1 className="mb-8 text-4xl font-bold">{t('user.myAccount')}</h1>

      {/* Profile Card */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-primary text-primary-foreground flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              {user?.role && (
                <p className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {user.role}
                </p>
              )}
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Edit className="h-4 w-4" />
            {t('common.edit')}
          </button>
        </div>
      </div>

      {/* Account Sections */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Account Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold">{t('user.profile')}</h3>
            <Settings className="h-5 w-5" />
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('auth.email')}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p>{user?.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('auth.fullName')}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-6 text-lg font-bold">{t('user.preferences')}</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg px-4 py-3 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              {t('user.editProfile')}
            </button>
            <button className="w-full rounded-lg px-4 py-3 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              {t('user.changePassword')}
            </button>
            <button className="w-full rounded-lg px-4 py-3 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              {t('user.addresses')}
            </button>
            <button className="w-full rounded-lg px-4 py-3 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              {t('user.notifications')}
            </button>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-6 text-lg font-bold">{t('user.orderHistory')}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            You have no orders yet.{' '}
            <a href="/shop" className="text-blue-600 hover:underline dark:text-blue-400">
              Start shopping now!
            </a>
          </p>
        </div>

        {/* Wishlist */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-6 text-lg font-bold">{t('user.wishlist')}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your wishlist is empty. Start adding your favorite items!
          </p>
        </div>
      </div>
    </div>
  );
}
