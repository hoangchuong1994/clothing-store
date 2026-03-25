'use client';

import { LogOut, Menu, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { LanguageSwitch } from '@/components/LanguageSwitch';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const locale = useLocale();
  const t = useTranslations();

  const navItems = [
    { label: t('nav.home'), href: `/${locale}` },
    { label: t('nav.shop'), href: `/${locale}/shop` },
    { label: t('nav.blog'), href: `/${locale}/blog` },
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="shrink-0">
            <span className="text-2xl font-bold tracking-tighter md:text-3xl">
              <span className="bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                DRIPCODE
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-primary text-sm font-medium transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switch */}
            <LanguageSwitch />

            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              className="hover:bg-muted relative rounded-lg p-2 transition-colors duration-300"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                0
              </span>
            </Link>

            {/* Auth */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2 transition-colors">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/user/profile`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {t('user.myAccount')}
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href={`/${locale}/admin`} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        {t('admin.dashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('user.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={`/${locale}/auth/login`}
                className="hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                {t('nav.login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="hover:bg-muted rounded-lg p-2 transition-colors duration-300 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="space-y-2 border-t pb-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:bg-muted block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
