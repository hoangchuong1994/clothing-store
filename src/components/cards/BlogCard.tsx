'use client';

import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Card } from '@/components/ui/card';
import type { BlogPost } from '@/data/dummy-data';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  locale?: string;
}

export function BlogCard({ post, priority = false, locale = 'en' }: BlogCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <Card className="group bg-card h-full transform cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        {/* Image Container */}
        <div className="bg-muted relative h-48 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="text-muted-foreground mb-4 flex flex-wrap gap-4 border-b pb-4 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <span className="text-xs">{post.readTime} min read</span>
          </div>

          {/* Read More Link */}
          <div className="text-primary flex items-center gap-2 text-sm font-bold uppercase transition-all duration-300 group-hover:gap-3">
            Read More
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
