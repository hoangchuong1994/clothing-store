import type { ProductDTO, CategoryDTO } from '@/lib/dto/product.dto';

export interface IProductRepository {
  list(): Promise<ProductDTO[]>;
  getById(id: string): Promise<ProductDTO | null>;
  getByIds(ids: string[]): Promise<ProductDTO[]>;
  search(query: string): Promise<ProductDTO[]>;
  getByCategory(categorySlug: string): Promise<ProductDTO[]>;
  getCategories(): Promise<CategoryDTO[]>;
  getFeatured(limit?: number): Promise<ProductDTO[]>;
  getRelated(productId: string, limit?: number): Promise<ProductDTO[]>;
}
