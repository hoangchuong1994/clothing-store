'use client';

import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { BLOG_POSTS } from '@/data/products';

export default function BlogPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="blog" className="w-full bg-black py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center md:mb-20">
          <span className="text-sm font-bold tracking-widest text-blue-400 uppercase">
            Stories & Tips
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
            Latest From Our{' '}
            <span className="bg-linear-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Fashion tips, style guides, and exclusive updates from the DRIPCODE team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group transform cursor-pointer overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  loading={post.id === 1 ? 'eager' : 'lazy'}
                  className={`object-cover transition-transform duration-500 ${
                    hoveredId === post.id ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Date Badge */}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-blue-500/90 px-3 py-1 text-xs font-bold text-black uppercase backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-2 text-sm text-gray-400">{post.excerpt}</p>

                {/* Meta Info */}
                <div className="mb-4 flex flex-wrap gap-4 border-b border-gray-800 pb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                </div>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-sm font-bold text-blue-400 uppercase transition-all duration-300 group-hover:gap-3">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center md:mt-16">
          <button className="transform rounded-lg bg-linear-to-r from-blue-500 to-cyan-600 px-8 py-4 font-bold tracking-wide text-black uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
            Explore All Articles
          </button>
        </div>
      </div>
    </section>
  );
}
