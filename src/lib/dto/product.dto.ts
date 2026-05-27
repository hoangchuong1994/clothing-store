/**
 * Runtime Product DTO.
 *
 * INVARIANT: product.id === product.slug
 *
 * The `id` field ALWAYS contains the canonical slug (e.g. "prod-001").
 * Internal DB cuid is NEVER exposed at this layer.
 */
export interface ProductDTO {
  id: string; // === slug, e.g. "prod-001"
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  badges?: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  isActive: boolean;
}

export interface CategoryDTO {
  id: string; // === slug
  name: string;
  image: string;
  description: string;
  slug: string;
}

export interface CartItemDTO {
  productId: string; // === product.slug, NEVER cuid
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartDTO {
  sessionId: string;
  userId?: string;
  items: CartItemDTO[];
  total: number;
}

export interface CheckoutPayloadDTO {
  sessionId: string;
  userId?: string;
  items: Array<{
    productId: string; // === slug
    name: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    subtotal: number;
  }>;
  total: number;
}

const CANONICAL_ID_PATTERN = /^prod-\d{3}$/;

export function assertCanonicalId(id: string, context: string): void {
  if (!CANONICAL_ID_PATTERN.test(id)) {
    throw new Error(
      `[IDENTITY_VIOLATION] Invalid canonical product ID "${id}" in ${context}. ` +
      `Expected format: prod-XXX. Possible cuid leakage detected.`
    );
  }
}

export function isCanonicalId(id: string): boolean {
  return CANONICAL_ID_PATTERN.test(id);
}

export function isCuid(id: string): boolean {
  return /^c[a-z0-9]{20,}$/i.test(id);
}

export function assertNoCuidLeakage(obj: Record<string, unknown>, context: string): void {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && isCuid(value)) {
      throw new Error(
        `[CUID_LEAKAGE] Detected cuid "${value}" in field "${key}" at ${context}. ` +
        `Internal DB IDs must never be exposed to runtime.`
      );
    }
  }
}
