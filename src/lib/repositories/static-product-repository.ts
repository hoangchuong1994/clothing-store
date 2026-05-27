import { PRODUCTS, CATEGORIES } from '@/data/dummy-data';
import type { ProductDTO, CategoryDTO } from '@/lib/dto/product.dto';
import type { IProductRepository } from '@/lib/repositories/product-repository.interface';

function toSlug(numericId: number): string {
  return `prod-${String(numericId).padStart(3, '0')}`;
}

function mapStaticProduct(p: (typeof PRODUCTS)[number]): ProductDTO {
  const slug = toSlug(p.id);
  return {
    id: slug,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    images: p.images,
    category: p.category,
    description: p.description,
    sizes: p.sizes,
    colors: p.colors,
    tags: p.tags,
    badges: p.badges,
    rating: p.rating,
    reviewCount: p.reviewCount,
    sku: `SKU-${slug.toUpperCase()}`,
    isActive: true,
  };
}

function mapStaticCategory(c: (typeof CATEGORIES)[number]): CategoryDTO {
  return {
    id: c.slug,
    name: c.name,
    image: c.image,
    description: c.description,
    slug: c.slug,
  };
}

export class StaticProductRepository implements IProductRepository {
  async list(): Promise<ProductDTO[]> {
    return PRODUCTS.map(mapStaticProduct);
  }

  async getById(id: string): Promise<ProductDTO | null> {
    const product = PRODUCTS.find((p) => toSlug(p.id) === id);
    return product ? mapStaticProduct(product) : null;
  }

  async getByIds(ids: string[]): Promise<ProductDTO[]> {
    return PRODUCTS
      .filter((p) => ids.includes(toSlug(p.id)))
      .map(mapStaticProduct);
  }

  async search(query: string): Promise<ProductDTO[]> {
    const q = query.toLowerCase();
    return PRODUCTS
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .map(mapStaticProduct);
  }

  async getByCategory(categorySlug: string): Promise<ProductDTO[]> {
    return PRODUCTS
      .filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase())
      .map(mapStaticProduct);
  }

  async getCategories(): Promise<CategoryDTO[]> {
    return CATEGORIES.map(mapStaticCategory);
  }

  async getFeatured(limit = 6): Promise<ProductDTO[]> {
    return PRODUCTS.slice(0, limit).map(mapStaticProduct);
  }

  async getRelated(productId: string, limit = 4): Promise<ProductDTO[]> {
    const product = PRODUCTS.find((p) => toSlug(p.id) === productId);
    if (!product) return [];
    return PRODUCTS
      .filter((p) => p.category === product.category && toSlug(p.id) !== productId)
      .slice(0, limit)
      .map(mapStaticProduct);
  }
}
