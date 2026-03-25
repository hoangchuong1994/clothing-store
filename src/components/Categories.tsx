'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import { CATEGORIES } from '@/data/products';

export default function Categories() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const t = useTranslations('home');

  return (
    <section className="w-full bg-linear-to-b from-black to-gray-900 py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-sm font-bold tracking-widest text-purple-400 uppercase">
            {t('shopByCollection')}
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
            {t('browseCategories')}{' '}
            <span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {t('categories')}
            </span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl md:h-80"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                loading={category.id === 1 ? 'eager' : 'lazy'}
                className={`object-cover transition-transform duration-500 ${
                  hoveredId === category.id ? 'scale-110' : 'scale-100'
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/80" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div
                  className={`transform transition-all duration-300 ${
                    hoveredId === category.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-90'
                  }`}
                >
                  <h3 className="mb-2 text-2xl font-black md:text-3xl">{category.name}</h3>
                  <p className="mb-4 text-sm text-gray-300">{category.description}</p>
                  <div className="flex items-center gap-2 font-bold tracking-wide text-purple-400 uppercase transition-all duration-300 group-hover:gap-3">
                    {t('explore')} <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Hover Highlight */}
              <div
                className={`absolute inset-0 border-2 border-purple-500 transition-opacity duration-300 ${
                  hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
