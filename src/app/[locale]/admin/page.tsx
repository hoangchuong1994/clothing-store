'use client';

import { useTranslations } from 'next-intl';

export default function AdminDashboard() {
  const t = useTranslations();

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">{t('admin.dashboard')}</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 text-white">
          <h3 className="text-sm font-medium text-gray-400">{t('admin.products')}</h3>
          <p className="mt-2 text-3xl font-bold">1,245</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 text-white">
          <h3 className="text-sm font-medium text-gray-400">{t('admin.orders')}</h3>
          <p className="mt-2 text-3xl font-bold">892</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 text-white">
          <h3 className="text-sm font-medium text-gray-400">{t('admin.customers')}</h3>
          <p className="mt-2 text-3xl font-bold">5,234</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 text-white">
          <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
          <p className="mt-2 text-3xl font-bold">$45.2K</p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold">{t('admin.analytics')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
              <span className="font-bold">$125,450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg Order Value</span>
              <span className="font-bold">$142.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
              <span className="font-bold">3.2%</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold">{t('admin.categories')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shirts</span>
              <span className="font-bold">234 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pants</span>
              <span className="font-bold">187 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Accessories</span>
              <span className="font-bold">512 items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
