/* src/contexts/theme-context.tsx */
'use client';

import React, { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'theme';
const DARK_CLASS = 'dark';

/**
 * Apply theme to DOM and persist to localStorage
 */
const applyTheme = (newTheme: Theme): void => {
  const root = document.documentElement;
  if (newTheme === 'dark') {
    root.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
  }
  localStorage.setItem(THEME_KEY, newTheme);
};

/**
 * Get initial theme from localStorage or system preference
 */
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  if (savedTheme) return savedTheme;

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return systemTheme;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Apply theme to DOM when it changes
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Set the actual theme after hydration
  useLayoutEffect(() => {
    const actualTheme = getInitialTheme();
    setTheme(actualTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<ThemeContextType>(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
