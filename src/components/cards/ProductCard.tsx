'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Product } from '@/data/dummy-data';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  featured?: boolean;
  priority?: boolean;
  locale?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  featured = false,
  priority = false,
  locale = 'en',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/${locale}/product/${product.id}`}>
      <Card className="group bg-card h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div
          className="bg-muted relative aspect-square w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              className="gap-2"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 left-3 flex flex-wrap gap-2">
            {product.badges?.map((badge) => (
              <span
                key={badge}
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                  badge === 'Sale'
                    ? 'bg-red-500 text-white'
                    : badge === 'New'
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-500 text-white'
                }`}
              >
                {badge}
              </span>
            ))}
            {discount > 0 && !product.badges?.includes('Sale') && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
            className="bg-background/80 hover:bg-primary absolute top-3 right-3 rounded-full border p-2 backdrop-blur-sm transition-colors duration-300"
          >
            <Heart
              className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="group-hover:text-primary line-clamp-2 text-sm font-bold transition-colors md:text-base">
              {product.name}
            </h3>
            <p className="text-muted-foreground mt-1 text-xs">{product.category}</p>
          </div>

          {/* Price Section */}
          <div className="mt-4 border-t pt-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-muted-foreground text-xs">({product.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Mobile Add to Cart */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.(product);
          }}
          className="w-full rounded-none"
          variant="default"
        >
          Add to Cart
        </Button>
      </Card>
    </Link>
  );
}
