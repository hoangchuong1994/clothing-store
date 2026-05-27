# Runtime Hardening Review

## Identity Contract

```
canonicalProductId = Product.slug
product.id === product.slug    (runtime invariant)
product.id = cuid()            (database internal only)
```

---

## 1. Repository Mapping — Hardened

### PrismaProductRepository

```typescript
// HARDENED: mapPrismaProduct()
function mapPrismaProduct(row: PrismaRow): ProductDTO {
  // REJECT if slug is missing
  if (!row.slug) {
    throw new Error(`[IDENTITY_VIOLATION] Product DB id="${row.id}" has NULL slug`);
  }

  // REJECT if slug doesn't match canonical pattern
  assertCanonicalId(row.slug, `mapPrismaProduct(db_id=${row.id})`);

  return {
    id: row.slug,  // NEVER row.id (cuid)
    // ...
  };
}
```

### StaticProductRepository

```typescript
// HARDENED: maps numeric ID → canonical slug
function toSlug(numericId: number): string {
  return `prod-${String(numericId).padStart(3, '0')}`;
}

// product.id = toSlug(staticProduct.id)
```

### REJECTED Patterns

```typescript
// UNSAFE - fallback hides identity errors
id: product.slug ?? product.id      // REJECTED
id: product.id ?? product.slug      // REJECTED
id: canonicalId ?? product.id       // REJECTED

// SAFE - strict mapping, throws on missing slug
id: product.slug                    // REQUIRED
// + assertCanonicalId(product.slug) // REQUIRED
```

---

## 2. DTO Mapping — Hardened

### ProductDTO

```typescript
interface ProductDTO {
  id: string;  // ALWAYS === slug, e.g. "prod-001"
  // Internal DB cuid NEVER appears in this interface
}
```

### Guard Functions

```typescript
// Validates canonical format
assertCanonicalId(id: string, context: string): void
// Throws: [IDENTITY_VIOLATION] if id doesn't match /^prod-\d{3}$/

// Detects cuid leakage
assertNoCuidLeakage(obj: Record<string, unknown>, context: string): void
// Throws: [CUID_LEAKAGE] if any string field matches cuid pattern

// Pattern checks
isCanonicalId(id: string): boolean  // /^prod-\d{3}$/
isCuid(id: string): boolean         // /^c[a-z0-9]{20,}$/i
```

---

## 3. Cache Mapping — Recommendations

If caching is added in the future:

```typescript
// Cache keys MUST use canonical slug
const cacheKey = `product:${product.slug}`;  // CORRECT
const cacheKey = `product:${product.id}`;    // CORRECT (id === slug)

// NEVER cache using DB cuid
const cacheKey = `product:${dbRow.id}`;      // REJECTED
```

### Cache Invalidation

```typescript
// When invalidating by ID, always use slug
cache.delete(`product:${slug}`);  // CORRECT
```

---

## 4. Cart Mapping — Hardened

### CartItemDTO

```typescript
interface CartItemDTO {
  productId: string;  // ALWAYS === product.slug
  // NEVER internal DB id
}
```

### Add to Cart

```typescript
async function addToCart(sessionId, productId, size, color, quantity) {
  // GUARD: Validate canonical ID before any operation
  assertCanonicalId(productId, 'addToCart.productId');

  const product = await repo.getById(productId);
  // product.id is already canonical (enforced by repository)
  assertCanonicalId(product.id, 'addToCart.product.id');

  const item: CartItemDTO = {
    productId: product.id,  // === slug
    // ...
  };
  validateCartItem(item, 'addToCart');
}
```

### Cart Hydration

```typescript
async function hydrateCart(sessionId) {
  for (const item of cart.items) {
    // GUARD: Validate every item's productId
    assertCanonicalId(item.productId, 'hydrateCart.item.productId');

    const product = productMap.get(item.productId);
    if (product) {
      // GUARD: Validate product identity after lookup
      assertCanonicalId(product.id, 'hydrateCart.product.id');
    }
  }
}
```

---

## 5. Merge Logic — Hardened

```typescript
function mergeCart(guestSessionId, userSessionId, userId) {
  for (const guestItem of guestCart.items) {
    // GUARD: Validate every guest item before merge
    assertCanonicalId(guestItem.productId, 'mergeCart.guestItem.productId');

    // Match by canonical productId + size + color
    const existing = userCart.items.find(
      item => item.productId === guestItem.productId
          && item.size === guestItem.size
          && item.color === guestItem.color
    );
    // Merge quantities, never IDs
  }
}
```

### REJECTED Merge Patterns

```typescript
// UNSAFE: Matching by anything other than canonical slug
items.find(i => i.id === guestItem.id)            // REJECTED (id might be cuid)
items.find(i => i.dbId === guestItem.dbId)         // REJECTED (db leak)
```

---

## 6. Checkout Payload — Hardened

```typescript
function buildCheckoutPayload(sessionId) {
  for (const item of cart.items) {
    // GUARD: Final validation before checkout
    assertCanonicalId(item.productId, 'checkout.item.productId');
  }

  // GUARD: Validate serialized payload has no cuid
  const payload = JSON.stringify(result);
  if (/c[a-z0-9]{20,}/i.test(payload)) {
    throw new Error('[CUID_LEAKAGE] Cuid detected in checkout payload');
  }
}
```

---

## 7. API Response — Recommendations

For any future API endpoints:

```typescript
// Middleware to validate all outgoing product data
function validateApiResponse(body: unknown) {
  const json = JSON.stringify(body);
  if (/c[a-z0-9]{20,}/i.test(json)) {
    throw new Error('[CUID_LEAKAGE] API response contains cuid');
  }
}
```

---

## Summary of Hardening Points

| Layer | Status | Guard |
|-------|--------|-------|
| Repository mapping | Hardened | `assertCanonicalId` on every `mapPrismaProduct` |
| DTO mapping | Hardened | `id: row.slug` (never `row.id`) |
| Cart add | Hardened | `assertCanonicalId` on input + product lookup |
| Cart hydrate | Hardened | `assertCanonicalId` on every item after hydration |
| Cart merge | Hardened | `assertCanonicalId` on every guest item |
| Checkout payload | Hardened | `assertCanonicalId` + JSON cuid scan |
| API responses | Recommended | Middleware validation |
| Cache keys | Recommended | Use slug-based keys only |

### Zero-Tolerance Policy

The system throws `Error` (not warning, not log) on:
- NULL slug in DB → runtime mapping
- Non-canonical ID in any DTO
- Cuid detected in any runtime output

This is by design. In production, a thrown error is preferable to silently
leaking internal database IDs to clients.
