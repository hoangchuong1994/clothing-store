'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function CartPage() {
  const locale = useLocale();
  const cartItems = [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-muted border-b py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
        </div>
      </section>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven t added anything to your cart yet
            </p>
            <Link href={`/${locale}/shop`}>
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-muted-foreground">Cart items would be displayed here</p>
          </div>
        </section>
      )}
    </div>
  );
}
