'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { ProductCard } from '@/components/cards/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCTS, CATEGORIES } from '@/data/dummy-data';

export function ShopContent() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all',
  );
  const [sortBy, setSortBy] = useState<string>('featured');

  let filteredProducts = PRODUCTS;

  if (selectedCategory && selectedCategory !== 'all') {
    filteredProducts = PRODUCTS.filter((p) => p.category.toLowerCase() === selectedCategory);
  }

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].slice().reverse();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-muted border-b py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Our Shop</h1>
          <p className="text-muted-foreground mt-2">
            Discover our complete collection of streetwear
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-bold">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Products
                  </Button>
                  {CATEGORIES.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(cat.slug)}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p) => {
                      router.push(`/${locale}/cart`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
