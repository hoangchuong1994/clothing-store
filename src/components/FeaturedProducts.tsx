'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { FEATURED_PRODUCTS } from '@/data/products';

export default function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);

  const handleAddToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
    // Reset after animation
    setTimeout(() => {
      setCartItems((prev) => prev.filter((id) => id !== productId));
    }, 1000);
  };

  return (
    <section id="featured" className="w-full bg-black py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center md:mb-20">
          <span className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
            New Arrivals
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
            Featured{' '}
            <span className="bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Drops
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Curated selection of our hottest pieces. Limited stock available.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group h-full"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Card */}
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-cyan-500">
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    loading={product.id === 1 ? 'eager' : 'lazy'}
                    className={`object-cover transition-transform duration-500 ${
                      hoveredId === product.id ? 'scale-110' : 'scale-100'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
                      hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex transform items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-bold tracking-wide text-black uppercase transition-all duration-300 hover:scale-110 hover:bg-cyan-400"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 rounded-full border border-gray-700 bg-black/50 p-2 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-500 hover:bg-cyan-500">
                    <Heart className="h-5 w-5 text-white" />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-bold text-black uppercase backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between p-4 md:p-5">
                  <div>
                    <h3 className="line-clamp-2 text-lg font-bold transition-colors duration-300 group-hover:text-cyan-400 md:text-xl">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{product.category}</p>
                  </div>

                  {/* Price */}
                  <div className="mt-4 border-t border-gray-800 pt-4">
                    <p className="text-2xl font-black text-cyan-400 md:text-3xl">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Mobile Add to Cart */}
                <button className="flex w-full items-center justify-center gap-2 bg-cyan-500 py-3 font-bold tracking-wide text-black uppercase transition-colors duration-300 hover:bg-cyan-400 md:hidden">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center md:mt-16">
          <button className="transform rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold tracking-wide text-black uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
