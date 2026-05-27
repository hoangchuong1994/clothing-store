import { resolveEffectiveMode } from '@/lib/config/repository-mode';
import type { IProductRepository } from '@/lib/repositories/product-repository.interface';
import { StaticProductRepository } from '@/lib/repositories/static-product-repository';

export type { IProductRepository };

let _instance: IProductRepository | null = null;

export function getProductRepository(): IProductRepository {
  if (_instance) return _instance;

  const mode = resolveEffectiveMode();

  if (mode === 'PRISMA') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaProductRepository } = require('@/lib/repositories/prisma-product-repository') as {
      PrismaProductRepository: new () => IProductRepository;
    };
    _instance = new PrismaProductRepository();
  } else {
    _instance = new StaticProductRepository();
  }

  return _instance;
}

export function resetRepository(): void {
  _instance = null;
}
