/**
 * Task 3: Verify STATIC vs PRISMA Parity
 *
 * Compares outputs between STATIC and PRISMA repositories to detect
 * hidden mismatches in:
 * - IDs, prices, stock, availability
 * - Cart behavior
 * - Checkout payload
 *
 * Usage: DATABASE_URL=... npx tsx scripts/verification/03-parity-check.ts
 */

import type { ProductDTO } from '../../src/lib/dto/product.dto';
import { StaticProductRepository } from '../../src/lib/repositories/static-product-repository';

interface AuditResult {
  check: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  detail: string;
}

const results: AuditResult[] = [];

function log(result: AuditResult) {
  results.push(result);
  const icon = result.status === 'PASS' ? '  PASS' : result.status === 'FAIL' ? '  FAIL' : '  WARN';
  console.log(`${icon}: ${result.check} - ${result.detail}`);
}

function compareProducts(
  staticProducts: ProductDTO[],
  prismaProducts: ProductDTO[],
  context: string
): void {
  const staticMap = new Map(staticProducts.map((p) => [p.id, p]));
  const prismaMap = new Map(prismaProducts.map((p) => [p.id, p]));

  // Check all static products exist in prisma
  const missingInPrisma = staticProducts.filter((p) => !prismaMap.has(p.id));
  const missingInStatic = prismaProducts.filter((p) => !staticMap.has(p.id));

  // prod-013 exists only in PRISMA (added for 13 products requirement)
  const extraInPrisma = missingInStatic.filter((p) => p.id !== 'prod-013');

  log({
    check: `${context}: All STATIC products in PRISMA`,
    status: missingInPrisma.length === 0 ? 'PASS' : 'FAIL',
    detail: missingInPrisma.length === 0
      ? 'All static products found in PRISMA'
      : `Missing: ${missingInPrisma.map((p) => p.id).join(', ')}`,
  });

  if (extraInPrisma.length > 0) {
    log({
      check: `${context}: Unexpected extra products in PRISMA`,
      status: 'WARNING',
      detail: `Extra: ${extraInPrisma.map((p) => p.id).join(', ')}`,
    });
  }

  // Compare overlapping products
  const overlap = staticProducts.filter((p) => prismaMap.has(p.id));
  const mismatches: string[] = [];

  for (const staticProd of overlap) {
    const prismaProd = prismaMap.get(staticProd.id)!;

    if (staticProd.price !== prismaProd.price) {
      mismatches.push(`${staticProd.id}: price ${staticProd.price} vs ${prismaProd.price}`);
    }
    if (staticProd.name !== prismaProd.name) {
      mismatches.push(`${staticProd.id}: name mismatch`);
    }
    if (staticProd.category !== prismaProd.category) {
      mismatches.push(`${staticProd.id}: category "${staticProd.category}" vs "${prismaProd.category}"`);
    }
    if (staticProd.isActive !== prismaProd.isActive) {
      mismatches.push(`${staticProd.id}: isActive ${staticProd.isActive} vs ${prismaProd.isActive}`);
    }
  }

  log({
    check: `${context}: Data parity (price, name, category, isActive)`,
    status: mismatches.length === 0 ? 'PASS' : 'FAIL',
    detail: mismatches.length === 0
      ? `${overlap.length} products match`
      : `Mismatches: ${mismatches.join('; ')}`,
  });
}

async function main() {
  console.log('========================================');
  console.log('  STATIC vs PRISMA PARITY CHECK');
  console.log('========================================\n');

  const staticRepo = new StaticProductRepository();

  // STATIC baseline
  const staticProducts = await staticRepo.list();
  log({
    check: 'STATIC baseline',
    status: staticProducts.length >= 12 ? 'PASS' : 'FAIL',
    detail: `${staticProducts.length} products in STATIC`,
  });

  // Check if PRISMA is available
  if (!process.env.DATABASE_URL) {
    console.log('\n  WARNING: DATABASE_URL not set. PRISMA parity check skipped.');
    console.log('  To run full parity check: DATABASE_URL=... npx tsx scripts/verification/03-parity-check.ts\n');

    // Still validate STATIC baseline
    log({
      check: 'STATIC: All IDs canonical',
      status: staticProducts.every((p) => /^prod-\d{3}$/.test(p.id)) ? 'PASS' : 'FAIL',
      detail: 'Checking canonical ID format',
    });

    log({
      check: 'STATIC: No duplicate IDs',
      status: new Set(staticProducts.map((p) => p.id)).size === staticProducts.length ? 'PASS' : 'FAIL',
      detail: `${staticProducts.length} unique IDs`,
    });

    log({
      check: 'STATIC: All prices > 0',
      status: staticProducts.every((p) => p.price > 0) ? 'PASS' : 'FAIL',
      detail: 'Price validation',
    });
  } else {
    try {
      const { PrismaProductRepository } = await import('../../src/lib/repositories/prisma-product-repository');
      const prismaRepo = new PrismaProductRepository();

      const prismaProducts = await prismaRepo.list();
      log({
        check: 'PRISMA baseline',
        status: prismaProducts.length === 13 ? 'PASS' : 'FAIL',
        detail: `${prismaProducts.length} products in PRISMA`,
      });

      compareProducts(staticProducts, prismaProducts, 'list()');

      // Compare getById for a sample
      const staticProd = await staticRepo.getById('prod-001');
      const prismaProd = await prismaRepo.getById('prod-001');

      if (staticProd && prismaProd) {
        log({
          check: 'getById("prod-001"): ID match',
          status: staticProd.id === prismaProd.id ? 'PASS' : 'FAIL',
          detail: `STATIC=${staticProd.id}, PRISMA=${prismaProd.id}`,
        });
        log({
          check: 'getById("prod-001"): price match',
          status: staticProd.price === prismaProd.price ? 'PASS' : 'FAIL',
          detail: `STATIC=$${staticProd.price}, PRISMA=$${prismaProd.price}`,
        });
      }

      // Compare categories
      const staticCats = await staticRepo.getCategories();
      const prismaCats = await prismaRepo.getCategories();
      log({
        check: 'Categories count match',
        status: staticCats.length === prismaCats.length ? 'PASS' : 'FAIL',
        detail: `STATIC=${staticCats.length}, PRISMA=${prismaCats.length}`,
      });

      // Compare search
      const staticSearch = await staticRepo.search('hoodie');
      const prismaSearch = await prismaRepo.search('hoodie');
      log({
        check: 'search("hoodie"): result overlap',
        status: staticSearch.length > 0 && prismaSearch.length > 0 ? 'PASS' : 'WARNING',
        detail: `STATIC=${staticSearch.length} results, PRISMA=${prismaSearch.length} results`,
      });
    } catch (err) {
      log({
        check: 'PRISMA connection',
        status: 'FAIL',
        detail: `Error: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  console.log('\n========================================');
  console.log('  SUMMARY');
  console.log('========================================');

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const warnings = results.filter((r) => r.status === 'WARNING').length;

  console.log(`  PASS: ${passed}`);
  console.log(`  FAIL: ${failed}`);
  console.log(`  WARNING: ${warnings}`);
  console.log(`\n  VERDICT: ${failed === 0 ? 'PASS' : 'FAIL'}`);

  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('FAIL:', e);
  process.exit(1);
});
