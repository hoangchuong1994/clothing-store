'use client';

import { Mail } from 'lucide-react';
import Image from 'next/image';

import { BlogCard } from '@/components/cards/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BLOG_POSTS } from '@/data/dummy-data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id,
  ).slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Image */}
      <div className="bg-muted relative h-96 w-full overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Meta Info */}
        <div className="mb-6 border-b pb-6">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <span>{post.date}</span>
            <span>•</span>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert mb-12 max-w-none space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={idx} className="text-2xl font-bold">
                  {paragraph.replace('##', '').trim()}
                </h2>
              );
            }
            if (paragraph.startsWith('-')) {
              return (
                <ul key={idx} className="list-inside list-disc space-y-2">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace('-', '').trim()}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Author Info */}
        <div className="mb-12 border-t border-b py-8">
          <h3 className="mb-4 font-bold">About the author</h3>
          <p className="text-muted-foreground">
            {post.author} is a writer at DRIPCODE dedicated to sharing insights about streetwear
            culture and fashion trends.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-primary/5 border-primary/20 mb-12 rounded-lg border p-8">
          <h3 className="mb-4 text-xl font-bold">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Get the latest articles delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="your@email.com" className="flex-1" />
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
