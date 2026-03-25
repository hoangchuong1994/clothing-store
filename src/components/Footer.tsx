'use client';

import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations();

  const footerLinks = {
    [t('footer.shop')]: [
      t('footer.newArrivals'),
      t('footer.bestSellers'),
      t('footer.collections'),
      t('footer.sale'),
    ],
    [t('footer.company')]: [
      t('footer.about'),
      t('footer.contact'),
      t('footer.careers'),
      t('footer.press'),
    ],
    [t('footer.support')]: [
      t('footer.shippingInfo'),
      t('footer.returns'),
      t('footer.faq'),
      t('footer.trackOrder'),
    ],
    [t('footer.legal')]: [
      t('footer.privacy'),
      t('footer.terms'),
      t('footer.cookiePolicy'),
      t('footer.accessibility'),
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: t('footer.instagram') },
    { icon: Twitter, href: '#', label: t('footer.twitter') },
    { icon: Facebook, href: '#', label: t('footer.facebook') },
    { icon: Youtube, href: '#', label: t('footer.youtube') },
  ];

  return (
    <footer className="border-t border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="mb-6 inline-block">
              <span className="text-2xl font-bold tracking-tighter">
                <span className="bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  DRIPCODE
                </span>
              </span>
            </Link>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{t('footer.brand')}</p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600 transition-colors duration-300 hover:text-cyan-400 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@dripcode.com">hello@dripcode.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 transition-colors duration-300 hover:text-cyan-400 dark:text-gray-400">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 transition-colors duration-300 hover:text-cyan-400 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>New York, USA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-bold tracking-widest uppercase">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-600 transition-colors duration-300 hover:text-cyan-400 dark:text-gray-400"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-8 md:pt-12 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Copyright */}
            <p className="text-center text-sm text-gray-600 md:text-left dark:text-gray-500">
              © {currentYear} DRIPCODE. {t('footer.copyright')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transform p-2 text-gray-600 transition-all duration-300 hover:scale-125 hover:text-cyan-400 dark:text-gray-400"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-xs text-gray-600">
          <p>Made by fashion lovers, for fashion lovers.</p>
        </div>
      </div>
    </footer>
  );
}
