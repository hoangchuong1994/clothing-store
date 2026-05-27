import type { CartDTO, CartItemDTO, CheckoutPayloadDTO } from '@/lib/dto/product.dto';
import { assertCanonicalId, assertNoCuidLeakage } from '@/lib/dto/product.dto';
import { getProductRepository } from '@/lib/repositories';

/**
 * In-memory cart store keyed by sessionId.
 * In production with PRISMA mode, this would use the Cart/CartItem tables.
 */
const cartStore = new Map<string, { userId?: string; items: CartItemDTO[] }>();

function validateCartItem(item: CartItemDTO, context: string): void {
  assertCanonicalId(item.productId, `${context}.productId`);
  assertNoCuidLeakage(
    { productId: item.productId, name: item.name, size: item.size, color: item.color },
    context
  );
}

export async function addToCart(
  sessionId: string,
  productId: string,
  size: string,
  color: string,
  quantity: number
): Promise<CartDTO> {
  assertCanonicalId(productId, 'addToCart.productId');

  const repo = getProductRepository();
  const product = await repo.getById(productId);
  if (!product) {
    throw new Error(`Product "${productId}" not found`);
  }

  assertCanonicalId(product.id, 'addToCart.product.id');

  const cart = cartStore.get(sessionId) ?? { items: [] };

  const existingIdx = cart.items.findIndex(
    (item) => item.productId === productId && item.size === size && item.color === color
  );

  if (existingIdx >= 0) {
    cart.items[existingIdx]!.quantity += quantity;
  } else {
    const newItem: CartItemDTO = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity,
    };
    validateCartItem(newItem, 'addToCart');
    cart.items.push(newItem);
  }

  cartStore.set(sessionId, cart);
  return buildCartDTO(sessionId, cart);
}

export function getCart(sessionId: string): CartDTO {
  const cart = cartStore.get(sessionId) ?? { items: [] };
  return buildCartDTO(sessionId, cart);
}

export async function hydrateCart(sessionId: string): Promise<CartDTO> {
  const cart = cartStore.get(sessionId) ?? { items: [] };
  if (cart.items.length === 0) return buildCartDTO(sessionId, cart);

  const repo = getProductRepository();
  const productIds = cart.items.map((item) => item.productId);
  const products = await repo.getByIds(productIds);

  const productMap = new Map(products.map((p) => [p.id, p]));

  const hydratedItems: CartItemDTO[] = [];
  for (const item of cart.items) {
    assertCanonicalId(item.productId, 'hydrateCart.item.productId');
    const product = productMap.get(item.productId);
    if (product) {
      assertCanonicalId(product.id, 'hydrateCart.product.id');
      hydratedItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      });
    }
  }

  cart.items = hydratedItems;
  cartStore.set(sessionId, cart);
  return buildCartDTO(sessionId, cart);
}

export function mergeCart(guestSessionId: string, userSessionId: string, userId: string): CartDTO {
  const guestCart = cartStore.get(guestSessionId) ?? { items: [] };
  const userCart = cartStore.get(userSessionId) ?? { userId, items: [] };

  for (const guestItem of guestCart.items) {
    assertCanonicalId(guestItem.productId, 'mergeCart.guestItem.productId');

    const existingIdx = userCart.items.findIndex(
      (item) =>
        item.productId === guestItem.productId &&
        item.size === guestItem.size &&
        item.color === guestItem.color
    );

    if (existingIdx >= 0) {
      userCart.items[existingIdx]!.quantity += guestItem.quantity;
    } else {
      userCart.items.push({ ...guestItem });
    }
  }

  userCart.userId = userId;
  cartStore.set(userSessionId, userCart);
  cartStore.delete(guestSessionId);

  return buildCartDTO(userSessionId, userCart);
}

export function buildCheckoutPayload(sessionId: string): CheckoutPayloadDTO {
  const cart = cartStore.get(sessionId);
  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const items = cart.items.map((item) => {
    assertCanonicalId(item.productId, 'buildCheckoutPayload.item.productId');
    return {
      productId: item.productId,
      name: item.name,
      price: item.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    };
  });

  const payload: CheckoutPayloadDTO = {
    sessionId,
    userId: cart.userId,
    items,
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
  };

  for (const item of payload.items) {
    assertNoCuidLeakage(
      { productId: item.productId, name: item.name },
      'buildCheckoutPayload'
    );
  }

  return payload;
}

function buildCartDTO(
  sessionId: string,
  cart: { userId?: string; items: CartItemDTO[] }
): CartDTO {
  return {
    sessionId,
    userId: cart.userId,
    items: cart.items,
    total: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

export function clearCart(sessionId: string): void {
  cartStore.delete(sessionId);
}
