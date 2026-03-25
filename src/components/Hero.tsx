'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-black via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-cyan-500 opacity-20 mix-blend-screen blur-3xl filter" />
        <div className="absolute right-10 bottom-20 h-72 w-72 animate-pulse rounded-full bg-purple-600 opacity-20 mix-blend-screen blur-3xl filter" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="rounded-full border border-cyan-500/50 bg-gray-900 px-4 py-2 text-sm font-medium tracking-widest text-cyan-400 uppercase backdrop-blur-sm">
              {t('heroBadge')}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl leading-tight font-black tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="text-white">{t('heroTitle1')}</span>
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href={`/${locale}#featured`}
              className="group flex transform items-center justify-center gap-2 rounded-lg bg-cyan-500 px-8 py-4 font-bold tracking-wide text-black uppercase transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
            >
              {t('shopNow')}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="rounded-lg border-2 border-cyan-500 bg-transparent px-8 py-4 font-bold tracking-wide text-cyan-400 uppercase transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-300">
              {t('viewCollection')}
            </button>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-xl grid-cols-3 gap-4 pt-12 text-sm md:gap-8 md:text-base">
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="text-xl font-bold text-cyan-400 md:text-2xl">500+</p>
              <p className="text-gray-500">{t('products')}</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4">
              <p className="text-xl font-bold text-purple-400 md:text-2xl">50k+</p>
              <p className="text-gray-500">{t('customers')}</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-4">
              <p className="text-xl font-bold text-blue-400 md:text-2xl">100+</p>
              <p className="text-gray-500">{t('dropsPerYear')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-gray-500 uppercase">{t('scroll')}</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-600 p-2">
            <div className="h-2 w-1 animate-pulse rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
