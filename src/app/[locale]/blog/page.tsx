'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';

import { BlogCard } from '@/components/cards/BlogCard';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS } from '@/data/dummy-data';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const locale = useLocale();

  const totalPages = Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const displayedPosts = BLOG_POSTS.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-muted border-b py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="text-muted-foreground mt-2">Latest news and insights from DRIPCODE</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} priority={idx === 0} locale={locale} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="text-muted-foreground text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
