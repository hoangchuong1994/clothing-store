'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useAuth } from '@/context/auth-context';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push(`/${locale}`);
    }
  }, [isAuthenticated, user, router, locale]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-4 p-6">
          <a href={`/${locale}/admin`} className="block rounded-lg p-3 hover:bg-gray-800">
            Dashboard
          </a>
          <a href={`/${locale}/admin/products`} className="block rounded-lg p-3 hover:bg-gray-800">
            Products
          </a>
          <a
            href={`/${locale}/admin/categories`}
            className="block rounded-lg p-3 hover:bg-gray-800"
          >
            Categories
          </a>
          <a href={`/${locale}/admin/orders`} className="block rounded-lg p-3 hover:bg-gray-800">
            Orders
          </a>
          <a href={`/${locale}/admin/customers`} className="block rounded-lg p-3 hover:bg-gray-800">
            Customers
          </a>
          <a href={`/${locale}/admin/analytics`} className="block rounded-lg p-3 hover:bg-gray-800">
            Analytics
          </a>
        </nav>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8 dark:bg-gray-950">{children}</main>
    </div>
  );
}
