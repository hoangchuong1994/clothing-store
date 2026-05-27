/**
 * Task 4: Smoke Verification
 *
 * Runnable smoke tests verifying the full flow:
 * 1. List products
 * 2. Get product by ID
 * 3. Add to cart
 * 4. Persist cart
 * 5. Refresh session (hydrate)
 * 6. Merge guest cart
 * 7. Checkout payload
 *
 * Fails immediately if any productId does not match /^prod-\d{3}$/
 * Fails immediately if cuid is detected anywhere.
 *
 * Usage: npx tsx scripts/verification/04-smoke-test.ts
 */

import { addToCart, getCart, hydrateCart, mergeCart, buildCheckoutPayload, clearCart } from '../../src/lib/cart/cart-service';
import { isCanonicalId, isCuid } from '../../src/lib/dto/product.dto';
import { StaticProductRepository } from '../../src/lib/repositories/static-product-repository';

const CANONICAL_PATTERN = /^prod-\d{3}$/;

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL';
  detail: string;
}

const results: TestResult[] = [];

function pass(test: string, detail: string) {
  results.push({ test, status: 'PASS', detail });
  console.log(`  PASS: ${test} - ${detail}`);
}

function fail(test: string, detail: string) {
  results.push({ test, status: 'FAIL', detail });
  console.log(`  FAIL: ${test} - ${detail}`);
}

function assertAllCanonical(ids: string[], context: string): boolean {
  const invalid = ids.filter((id) => !CANONICAL_PATTERN.test(id));
  if (invalid.length > 0) {
    fail(context, `Non-canonical IDs detected: [${invalid.join(', ')}]`);
    return false;
  }
  const cuids = ids.filter(isCuid);
  if (cuids.length > 0) {
    fail(context, `CUID leakage detected: [${cuids.join(', ')}]`);
    return false;
  }
  return true;
}

async function main() {
  console.log('========================================');
  console.log('  SMOKE VERIFICATION');
  console.log('========================================\n');

  const repo = new StaticProductRepository();

  // 1. List products
  console.log('--- Test 1: List Products ---');
  const products = await repo.list();
  if (products.length >= 12) {
    pass('List products', `${products.length} products returned`);
  } else {
    fail('List products', `Only ${products.length} products returned`);
  }
  const allIds = products.map((p) => p.id);
  if (assertAllCanonical(allIds, 'List products: all IDs canonical')) {
    pass('List products: ID format', `All ${allIds.length} IDs match prod-XXX pattern`);
  }

  // 2. Get product by ID
  console.log('\n--- Test 2: Get Product ---');
  const product = await repo.getById('prod-001');
  if (product) {
    pass('getById("prod-001")', `Found: ${product.name}`);
    if (product.id === 'prod-001') {
      pass('getById: identity invariant', `product.id === "prod-001"`);
    } else {
      fail('getById: identity invariant', `product.id = "${product.id}" !== "prod-001"`);
    }
    if (isCanonicalId(product.id) && !isCuid(product.id)) {
      pass('getById: no cuid', 'No cuid leakage in product.id');
    } else {
      fail('getById: cuid check', `product.id = "${product.id}"`);
    }
  } else {
    fail('getById("prod-001")', 'Product not found');
  }

  // 3. Add to cart
  console.log('\n--- Test 3: Add to Cart ---');
  const sessionId = 'smoke-test-session';
  clearCart(sessionId);

  const cart = await addToCart(sessionId, 'prod-001', 'M', 'Black', 2);
  if (cart.items.length === 1) {
    pass('Add to cart', `1 item in cart`);
  } else {
    fail('Add to cart', `Expected 1 item, got ${cart.items.length}`);
  }
  if (cart.items[0] && isCanonicalId(cart.items[0].productId)) {
    pass('Cart item: canonical productId', `productId = "${cart.items[0].productId}"`);
  } else {
    fail('Cart item: canonical productId', `productId = "${cart.items[0]?.productId}"`);
  }
  if (cart.items[0] && isCuid(cart.items[0].productId)) {
    fail('Cart item: cuid leakage', `CUID detected: "${cart.items[0].productId}"`);
  } else {
    pass('Cart item: no cuid', 'No cuid in cart item');
  }

  // Add second product
  await addToCart(sessionId, 'prod-005', 'L', 'Black', 1);

  // 4. Persist cart (get cart)
  console.log('\n--- Test 4: Persist Cart ---');
  const persistedCart = getCart(sessionId);
  if (persistedCart.items.length === 2) {
    pass('Persist cart', `2 items persisted`);
  } else {
    fail('Persist cart', `Expected 2 items, got ${persistedCart.items.length}`);
  }
  const cartProductIds = persistedCart.items.map((i) => i.productId);
  assertAllCanonical(cartProductIds, 'Persisted cart: all productIds canonical');

  // 5. Refresh session (hydrate)
  console.log('\n--- Test 5: Refresh Session (Hydrate) ---');
  const hydrated = await hydrateCart(sessionId);
  if (hydrated.items.length === 2) {
    pass('Hydrate cart', `2 items after hydration`);
  } else {
    fail('Hydrate cart', `Expected 2 items, got ${hydrated.items.length}`);
  }
  const hydratedIds = hydrated.items.map((i) => i.productId);
  if (assertAllCanonical(hydratedIds, 'Hydrated cart: all productIds canonical')) {
    pass('Hydrated cart: identity preserved', 'All productIds are canonical after hydration');
  }

  // 6. Merge guest cart
  console.log('\n--- Test 6: Merge Guest Cart ---');
  const guestSession = 'guest-session-123';
  clearCart(guestSession);
  await addToCart(guestSession, 'prod-010', 'S', 'White', 3);
  await addToCart(guestSession, 'prod-001', 'M', 'Black', 1); // overlap

  const userSession = 'user-session-456';
  clearCart(userSession);
  // Copy main cart to user session
  await addToCart(userSession, 'prod-001', 'M', 'Black', 2);
  await addToCart(userSession, 'prod-005', 'L', 'Black', 1);

  const merged = mergeCart(guestSession, userSession, 'user-abc');
  if (merged.items.length === 3) {
    pass('Merge cart', `3 unique items after merge`);
  } else {
    fail('Merge cart', `Expected 3 items, got ${merged.items.length}`);
  }

  const mergedIds = merged.items.map((i) => i.productId);
  if (assertAllCanonical(mergedIds, 'Merged cart: all productIds canonical')) {
    pass('Merged cart: identity preserved', 'No cuid leakage after merge');
  }

  // Check quantities merged correctly
  const prod001Item = merged.items.find((i) => i.productId === 'prod-001' && i.size === 'M' && i.color === 'Black');
  if (prod001Item && prod001Item.quantity === 3) {
    pass('Merge cart: quantity merge', `prod-001 M/Black quantity = 3 (2 + 1)`);
  } else {
    fail('Merge cart: quantity merge', `prod-001 M/Black quantity = ${prod001Item?.quantity} (expected 3)`);
  }

  // Guest cart should be cleared
  const guestAfterMerge = getCart(guestSession);
  if (guestAfterMerge.items.length === 0) {
    pass('Merge cart: guest cleared', 'Guest cart emptied after merge');
  } else {
    fail('Merge cart: guest cleared', `Guest cart still has ${guestAfterMerge.items.length} items`);
  }

  // 7. Checkout payload
  console.log('\n--- Test 7: Checkout Payload ---');
  const payload = buildCheckoutPayload(userSession);
  if (payload.items.length === 3) {
    pass('Checkout payload', `3 items in payload`);
  } else {
    fail('Checkout payload', `Expected 3 items, got ${payload.items.length}`);
  }

  const payloadIds = payload.items.map((i) => i.productId);
  if (assertAllCanonical(payloadIds, 'Checkout payload: all productIds canonical')) {
    pass('Checkout payload: identity', 'All productIds are canonical');
  }

  if (payload.total > 0) {
    pass('Checkout payload: total', `Total = $${payload.total.toFixed(2)}`);
  } else {
    fail('Checkout payload: total', `Total = $${payload.total}`);
  }

  // Verify no cuid anywhere in payload
  const payloadStr = JSON.stringify(payload);
  const cuidMatch = payloadStr.match(/c[a-z0-9]{20,}/gi);
  if (!cuidMatch) {
    pass('Checkout payload: no cuid in serialized', 'No cuid found in JSON');
  } else {
    fail('Checkout payload: cuid leak in serialized', `Found: ${cuidMatch.join(', ')}`);
  }

  // Cleanup
  clearCart(sessionId);
  clearCart(userSession);

  // Summary
  console.log('\n========================================');
  console.log('  SMOKE TEST SUMMARY');
  console.log('========================================');

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;

  console.log(`  PASS: ${passed}`);
  console.log(`  FAIL: ${failed}`);
  console.log(`  TOTAL: ${results.length}`);
  console.log(`\n  VERDICT: ${failed === 0 ? 'PASS' : 'FAIL'}`);

  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('FAIL: Smoke test error:', e);
  process.exit(1);
});
