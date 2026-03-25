'use client';

import { Star } from 'lucide-react';
import React from 'react';

import { Card } from '@/components/ui/card';
import type { Review } from '@/data/dummy-data';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="text-lg font-bold">{review.title}</h4>
          <p className="text-muted-foreground text-sm">{review.author}</p>
        </div>
        {review.verified && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
            Verified
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'
            }`}
          />
        ))}
      </div>

      {/* Review Content */}
      <p className="mb-4 text-sm">{review.content}</p>

      {/* Date */}
      <p className="text-muted-foreground text-xs">{review.date}</p>
    </Card>
  );
}
