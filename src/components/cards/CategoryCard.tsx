'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Card } from '@/components/ui/card';
import type { Category } from '@/data/dummy-data';

interface CategoryCardProps {
  category: Category;
  priority?: boolean;
}

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link href={`/shop?category=${category.slug}`}>
      <Card className="group relative h-64 cursor-pointer overflow-hidden md:h-80">
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div
            className={`transform transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
            }`}
          >
            <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">{category.name}</h3>
            <p className="mb-4 text-sm text-gray-300">{category.description}</p>
            <div className="text-primary flex items-center gap-2 text-sm font-bold uppercase transition-all duration-300 group-hover:gap-3">
              Explore <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Hover Border */}
        <div
          className={`border-primary absolute inset-0 border-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </Card>
    </Link>
  );
}
