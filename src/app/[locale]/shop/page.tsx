'use client';

import { Suspense } from 'react';
import { ShopContent } from './shop-content';

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
