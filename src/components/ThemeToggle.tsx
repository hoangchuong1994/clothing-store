'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-yellow-500"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}
