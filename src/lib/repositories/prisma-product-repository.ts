import type { ProductDTO, CategoryDTO } from '@/lib/dto/product.dto';
import { assertCanonicalId } from '@/lib/dto/product.dto';
import { getPrismaClient } from '@/lib/prisma';
import type { IProductRepository } from '@/lib/repositories/product-repository.interface';

/**
 * Maps a Prisma Product row to ProductDTO.
 *
 * CRITICAL: product.id in DTO === product.slug from DB.
 * Internal DB cuid (row.id) is NEVER exposed.
 */
function mapPrismaProduct(row: {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  description: string;
  sku: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  badges: string[];
  isActive: boolean;
  category: { name: string };
  images: Array<{ url: string }>;
  variants: Array<{ size: string; color: string }>;
}): ProductDTO {
  if (!row.slug) {
    throw new Error(
      `[IDENTITY_VIOLATION] Product with DB id "${row.id}" has NULL slug. ` +
      `Cannot map to runtime DTO. Slug is required.`
    );
  }

  assertCanonicalId(row.slug, `PrismaProductRepository.mapPrismaProduct(db_id=${row.id})`);

  const sizes = [...new Set(row.variants.map((v) => v.size))];
  const colors = [...new Set(row.variants.map((v) => v.color))];

  return {
    id: row.slug,
    name: row.name,
    price: row.price,
    originalPrice: row.originalPrice ?? undefined,
    image: row.image,
    images: row.images.length > 0 ? row.images.map((img) => img.url) : [row.image],
    category: row.category.name,
    description: row.description,
    sizes,
    colors,
    tags: row.tags,
    badges: row.badges.length > 0 ? row.badges : undefined,
    rating: row.rating,
    reviewCount: row.reviewCount,
    sku: row.sku,
    isActive: row.isActive,
  };
}

function mapPrismaCategory(row: {
  slug: string;
  name: string;
  image: string;
  description: string;
}): CategoryDTO {
  return {
    id: row.slug,
    name: row.name,
    image: row.image,
    description: row.description,
    slug: row.slug,
  };
}

const productInclude = {
  category: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  variants: { where: { isActive: true } },
};

export class PrismaProductRepository implements IProductRepository {
  async list(): Promise<ProductDTO[]> {
    const prisma = getPrismaClient();
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      include: productInclude,
      orderBy: { createdAt: 'asc' },
    });
    return rows.map(mapPrismaProduct);
  }

  async getById(id: string): Promise<ProductDTO | null> {
    assertCanonicalId(id, 'PrismaProductRepository.getById');
    const prisma = getPrismaClient();
    const row = await prisma.product.findUnique({
      where: { slug: id },
      include: productInclude,
    });
    return row ? mapPrismaProduct(row) : null;
  }

  async getByIds(ids: string[]): Promise<ProductDTO[]> {
    ids.forEach((id) => assertCanonicalId(id, 'PrismaProductRepository.getByIds'));
    const prisma = getPrismaClient();
    const rows = await prisma.product.findMany({
      where: { slug: { in: ids }, isActive: true },
      include: productInclude,
    });
    return rows.map(mapPrismaProduct);
  }

  async search(query: string): Promise<ProductDTO[]> {
    const prisma = getPrismaClient();
    const rows = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: [query.toLowerCase()] } },
        ],
      },
      include: productInclude,
    });
    return rows.map(mapPrismaProduct);
  }

  async getByCategory(categorySlug: string): Promise<ProductDTO[]> {
    const prisma = getPrismaClient();
    const rows = await prisma.product.findMany({
      where: {
        isActive: true,
        category: { slug: categorySlug },
      },
      include: productInclude,
    });
    return rows.map(mapPrismaProduct);
  }

  async getCategories(): Promise<CategoryDTO[]> {
    const prisma = getPrismaClient();
    const rows = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return rows.map(mapPrismaCategory);
  }

  async getFeatured(limit = 6): Promise<ProductDTO[]> {
    const prisma = getPrismaClient();
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      include: productInclude,
      orderBy: { rating: 'desc' },
      take: limit,
    });
    return rows.map(mapPrismaProduct);
  }

  async getRelated(productId: string, limit = 4): Promise<ProductDTO[]> {
    assertCanonicalId(productId, 'PrismaProductRepository.getRelated');
    const prisma = getPrismaClient();
    const product = await prisma.product.findUnique({
      where: { slug: productId },
      select: { categoryId: true },
    });
    if (!product) return [];
    const rows = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: product.categoryId,
        slug: { not: productId },
      },
      include: productInclude,
      take: limit,
    });
    return rows.map(mapPrismaProduct);
  }
}
