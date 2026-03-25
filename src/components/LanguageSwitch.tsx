'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  // Get path without locale prefix
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

  const otherLocale = locale === 'en' ? 'vi' : 'en';
  const otherLocaleName = locale === 'en' ? 'Tiếng Việt' : 'English';

  return (
    <Link
      href={`/${otherLocale}${pathWithoutLocale}`}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      {otherLocaleName}
    </Link>
  );
}
