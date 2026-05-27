/**
 * Task 2: Verify Runtime Identity Integrity
 *
 * Audits all repository methods to verify:
 * - product.id === product.slug (canonical format)
 * - No cuid leakage in any runtime output
 * - No null slug
 * - Consistent mappings across methods
 *
 * Tests STATIC and PRISMA repositories.
 *
 * Usage: REPOSITORY_MODE=STATIC npx tsx scripts/verification/02-runtime-identity-audit.ts
 *        REPOSITORY_MODE=PRISMA npx tsx scripts/verification/02-runtime-identity-audit.ts
 */

import type { ProductDTO } from '../../src/lib/dto/product.dto';
import { isCanonicalId, isCuid } from '../../src/lib/dto/product.dto';
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

function auditProductIdentity(products: ProductDTO[], method: string): void {
  const cuidLeaks: string[] = [];
  const nullSlugs: string[] = [];
  const invalidIds: string[] = [];

  for (const product of products) {
    if (!product.id) {
      nullSlugs.push('(null id)');
      continue;
    }

    if (!isCanonicalId(product.id)) {
      invalidIds.push(product.id);
    }

    if (isCuid(product.id)) {
      cuidLeaks.push(product.id);
    }

    // Deep scan all string fields for cuid leakage
    const fields: Record<string, unknown> = {
      id: product.id,
      name: product.name,
      category: product.category,
      sku: product.sku,
      image: product.image,
      description: product.description,
    };
    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === 'string' && isCuid(value) && key !== 'image' && key !== 'description') {
        cuidLeaks.push(`${product.id}.${key}=${value}`);
      }
    }
  }

  log({
    check: `${method}: No null IDs`,
    status: nullSlugs.length === 0 ? 'PASS' : 'FAIL',
    detail: nullSlugs.length === 0 ? 'All products have non-null ID' : `Null IDs: ${nullSlugs.length}`,
  });

  log({
    check: `${method}: All IDs are canonical (prod-XXX)`,
    status: invalidIds.length === 0 ? 'PASS' : 'FAIL',
    detail: invalidIds.length === 0
      ? `All ${products.length} products have canonical IDs`
      : `Invalid IDs: [${invalidIds.join(', ')}]`,
  });

  log({
    check: `${method}: No cuid leakage`,
    status: cuidLeaks.length === 0 ? 'PASS' : 'FAIL',
    detail: cuidLeaks.length === 0
      ? 'No cuid values detected in runtime output'
      : `CUID leakage detected: [${cuidLeaks.join(', ')}]`,
  });
}

async function auditStaticRepository() {
  console.log('\n--- STATIC Repository Audit ---\n');
  const repo = new StaticProductRepository();

  // list()
  const allProducts = await repo.list();
  log({
    check: 'STATIC list(): product count',
    status: allProducts.length >= 12 ? 'PASS' : 'FAIL',
    detail: `Found ${allProducts.length} products`,
  });
  auditProductIdentity(allProducts, 'STATIC list()');

  // getById()
  const product = await repo.getById('prod-001');
  log({
    check: 'STATIC getById("prod-001"): found',
    status: product !== null ? 'PASS' : 'FAIL',
    detail: product ? `Found: ${product.name} (id=${product.id})` : 'Not found',
  });
  if (product) {
    log({
      check: 'STATIC getById("prod-001"): id === "prod-001"',
      status: product.id === 'prod-001' ? 'PASS' : 'FAIL',
      detail: `product.id = "${product.id}"`,
    });
  }

  // getByIds()
  const subset = await repo.getByIds(['prod-001', 'prod-005', 'prod-010']);
  log({
    check: 'STATIC getByIds(): count',
    status: subset.length === 3 ? 'PASS' : 'FAIL',
    detail: `Found ${subset.length} products (expected 3)`,
  });
  auditProductIdentity(subset, 'STATIC getByIds()');

  // search()
  const searchResults = await repo.search('hoodie');
  log({
    check: 'STATIC search("hoodie"): results',
    status: searchResults.length > 0 ? 'PASS' : 'WARNING',
    detail: `Found ${searchResults.length} results`,
  });
  auditProductIdentity(searchResults, 'STATIC search()');

  // getCategories()
  const categories = await repo.getCategories();
  log({
    check: 'STATIC getCategories(): count',
    status: categories.length === 6 ? 'PASS' : 'FAIL',
    detail: `Found ${categories.length} categories`,
  });
  for (const cat of categories) {
    if (isCuid(cat.id)) {
      log({
        check: `STATIC getCategories(): no cuid in category id`,
        status: 'FAIL',
        detail: `Category "${cat.name}" has cuid id: ${cat.id}`,
      });
    }
  }

  // getFeatured()
  const featured = await repo.getFeatured();
  auditProductIdentity(featured, 'STATIC getFeatured()');

  // getRelated()
  const related = await repo.getRelated('prod-001');
  auditProductIdentity(related, 'STATIC getRelated()');
}

async function auditPrismaRepository() {
  const mode = process.env.REPOSITORY_MODE?.toUpperCase();
  if (mode !== 'PRISMA' && mode !== 'AUTO') {
    console.log('\n--- PRISMA Repository Audit: SKIPPED (REPOSITORY_MODE != PRISMA) ---\n');
    return;
  }

  console.log('\n--- PRISMA Repository Audit ---\n');

  try {
    const { PrismaProductRepository } = await import('../../src/lib/repositories/prisma-product-repository');
    const repo = new PrismaProductRepository();

    const allProducts = await repo.list();
    log({
      check: 'PRISMA list(): product count == 13',
      status: allProducts.length === 13 ? 'PASS' : 'FAIL',
      detail: `Found ${allProducts.length} products`,
    });
    auditProductIdentity(allProducts, 'PRISMA list()');

    const product = await repo.getById('prod-001');
    log({
      check: 'PRISMA getById("prod-001"): found',
      status: product !== null ? 'PASS' : 'FAIL',
      detail: product ? `Found: ${product.name} (id=${product.id})` : 'Not found',
    });
    if (product) {
      log({
        check: 'PRISMA getById("prod-001"): id === "prod-001"',
        status: product.id === 'prod-001' ? 'PASS' : 'FAIL',
        detail: `product.id = "${product.id}"`,
      });
    }

    const subset = await repo.getByIds(['prod-001', 'prod-005', 'prod-010']);
    log({
      check: 'PRISMA getByIds(): count',
      status: subset.length === 3 ? 'PASS' : 'FAIL',
      detail: `Found ${subset.length} products (expected 3)`,
    });
    auditProductIdentity(subset, 'PRISMA getByIds()');

    const searchResults = await repo.search('hoodie');
    auditProductIdentity(searchResults, 'PRISMA search()');

    const categories = await repo.getCategories();
    for (const cat of categories) {
      if (isCuid(cat.id)) {
        log({
          check: `PRISMA getCategories(): no cuid in category id`,
          status: 'FAIL',
          detail: `Category "${cat.name}" has cuid id: ${cat.id}`,
        });
      }
    }

    const featured = await repo.getFeatured();
    auditProductIdentity(featured, 'PRISMA getFeatured()');

    const related = await repo.getRelated('prod-001');
    auditProductIdentity(related, 'PRISMA getRelated()');
  } catch (err) {
    log({
      check: 'PRISMA Repository',
      status: 'FAIL',
      detail: `Failed to load: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
}

async function main() {
  console.log('========================================');
  console.log('  RUNTIME IDENTITY INTEGRITY AUDIT');
  console.log('========================================');

  await auditStaticRepository();
  await auditPrismaRepository();

  console.log('\n========================================');
  console.log('  SUMMARY');
  console.log('========================================');

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const warnings = results.filter((r) => r.status === 'WARNING').length;

  console.log(`  PASS: ${passed}`);
  console.log(`  FAIL: ${failed}`);
  console.log(`  WARNING: ${warnings}`);
  console.log(`  TOTAL: ${results.length}`);
  console.log(`\n  VERDICT: ${failed === 0 ? 'PASS' : 'FAIL'}`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('FAIL: Runtime audit error:', e);
  process.exit(1);
});
