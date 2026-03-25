'use client';

import { Heart, Share2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { ProductCard } from '@/components/cards/ProductCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCTS, REVIEWS } from '@/data/dummy-data';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

function ProductPageClient({ product }: { product: (typeof PRODUCTS)[0] }) {
  const locale = useLocale();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* Product Section */}
      <section className="border-b py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery */}
            <div>
              <div className="bg-muted relative mb-4 aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.images[selectedImage] || product.images[0] || ''}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`bg-muted relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="mb-3 flex gap-2">
                  {product.badges?.map((badge) => (
                    <Badge key={badge} variant={badge === 'Sale' ? 'destructive' : 'secondary'}>
                      {badge}
                    </Badge>
                  ))}
                </div>
                <h1 className="mb-2 text-4xl font-bold">{product.name}</h1>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <div className="mb-6 flex gap-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                </div>
                <p className="text-muted-foreground mb-6">{product.description}</p>
              </div>

              {/* Options */}
              <div className="mb-6 space-y-6">
                {/* Color */}
                <div>
                  <h3 className="mb-3 font-medium">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-md border-2 px-4 py-2 transition ${
                          selectedColor === color
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="mb-3 block font-medium">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="mb-3 block font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-border hover:bg-muted flex h-10 w-10 items-center justify-center rounded border"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-border hover:bg-muted flex h-10 w-10 items-center justify-center rounded border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-6 flex gap-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsFavorited(!isFavorited)}>
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="text-muted-foreground space-y-2 border-t pt-6 text-sm">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {productReviews.length > 0 && (
        <section className="border-b py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold">Customer Reviews</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {productReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} onAddToCart={() => {}} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
