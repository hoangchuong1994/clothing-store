/**
 * Task 1: Verify Seeded Database
 *
 * Audits the database after seeding to verify:
 * - Exactly 13 products
 * - slug NOT NULL and UNIQUE
 * - slug matches prod-001..prod-013
 * - SKU unique
 * - Required FKs valid (categoryId, createdById)
 * - Variants + inventory valid
 *
 * Usage: npx tsx scripts/verification/01-db-audit.ts
 */

import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

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

async function auditProductCount() {
  const count = await prisma.product.count();
  log({
    check: 'Product count == 13',
    status: count === 13 ? 'PASS' : 'FAIL',
    detail: `Found ${count} products (expected 13)`,
  });
}

async function auditSlugsNotNull() {
  const nullSlugs = await prisma.product.count({ where: { slug: '' } });
  const allProducts = await prisma.product.findMany({ select: { id: true, slug: true } });
  const hasNull = allProducts.some((p) => !p.slug);
  log({
    check: 'slug NOT NULL',
    status: !hasNull && nullSlugs === 0 ? 'PASS' : 'FAIL',
    detail: hasNull ? `Found products with NULL/empty slug` : 'All products have non-null slug',
  });
}

async function auditSlugsUnique() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  const slugs = products.map((p) => p.slug);
  const uniqueSlugs = new Set(slugs);
  log({
    check: 'slug UNIQUE',
    status: slugs.length === uniqueSlugs.size ? 'PASS' : 'FAIL',
    detail: slugs.length === uniqueSlugs.size
      ? `All ${slugs.length} slugs are unique`
      : `Found duplicate slugs: ${slugs.filter((s, i) => slugs.indexOf(s) !== i).join(', ')}`,
  });
}

async function auditSlugPattern() {
  const products = await prisma.product.findMany({ select: { slug: true }, orderBy: { slug: 'asc' } });
  const expectedSlugs = Array.from({ length: 13 }, (_, i) => `prod-${String(i + 1).padStart(3, '0')}`);
  const actualSlugs = products.map((p) => p.slug).sort();
  const missing = expectedSlugs.filter((s) => !actualSlugs.includes(s));
  const extra = actualSlugs.filter((s) => !expectedSlugs.includes(s));

  log({
    check: 'slug matches prod-001..prod-013',
    status: missing.length === 0 && extra.length === 0 ? 'PASS' : 'FAIL',
    detail: missing.length === 0 && extra.length === 0
      ? 'All 13 canonical slugs present'
      : `Missing: [${missing.join(', ')}], Extra: [${extra.join(', ')}]`,
  });
}

async function auditSkuUnique() {
  const products = await prisma.product.findMany({ select: { sku: true } });
  const skus = products.map((p) => p.sku);
  const uniqueSkus = new Set(skus);
  log({
    check: 'SKU unique',
    status: skus.length === uniqueSkus.size ? 'PASS' : 'FAIL',
    detail: skus.length === uniqueSkus.size
      ? `All ${skus.length} SKUs are unique`
      : `Duplicate SKUs found`,
  });
}

async function auditCategoryFK() {
  const products = await prisma.product.findMany({
    select: { slug: true, categoryId: true, category: true },
  });
  const invalid = products.filter((p) => !p.categoryId || !p.category);
  log({
    check: 'categoryId FK valid',
    status: invalid.length === 0 ? 'PASS' : 'FAIL',
    detail: invalid.length === 0
      ? 'All products have valid categoryId'
      : `Invalid categoryId on: ${invalid.map((p) => p.slug).join(', ')}`,
  });
}

async function auditCreatedByFK() {
  const products = await prisma.product.findMany({
    select: { slug: true, createdById: true, createdBy: true },
  });
  const invalid = products.filter((p) => !p.createdById || !p.createdBy);
  log({
    check: 'createdById FK valid',
    status: invalid.length === 0 ? 'PASS' : 'FAIL',
    detail: invalid.length === 0
      ? 'All products have valid createdById'
      : `Invalid createdById on: ${invalid.map((p) => p.slug).join(', ')}`,
  });
}

async function auditVariants() {
  const products = await prisma.product.findMany({
    select: { slug: true, variants: true },
  });
  const noVariants = products.filter((p) => p.variants.length === 0);
  const negativeStock = products.flatMap((p) =>
    p.variants.filter((v) => v.stock < 0).map((v) => `${p.slug}:${v.size}/${v.color}`)
  );

  log({
    check: 'All products have variants',
    status: noVariants.length === 0 ? 'PASS' : 'WARNING',
    detail: noVariants.length === 0
      ? 'All products have at least one variant'
      : `Products without variants: ${noVariants.map((p) => p.slug).join(', ')}`,
  });

  log({
    check: 'No negative stock',
    status: negativeStock.length === 0 ? 'PASS' : 'FAIL',
    detail: negativeStock.length === 0
      ? 'All variant stock >= 0'
      : `Negative stock on: ${negativeStock.join(', ')}`,
  });
}

async function auditNoCuidInSlug() {
  const cuidPattern = /^c[a-z0-9]{20,}$/i;
  const products = await prisma.product.findMany({ select: { slug: true } });
  const cuidSlugs = products.filter((p) => cuidPattern.test(p.slug));
  log({
    check: 'No cuid in slug field',
    status: cuidSlugs.length === 0 ? 'PASS' : 'FAIL',
    detail: cuidSlugs.length === 0
      ? 'No cuid values found in slug field'
      : `CUID detected in slugs: ${cuidSlugs.map((p) => p.slug).join(', ')}`,
  });
}

async function main() {
  console.log('========================================');
  console.log('  DATABASE AUDIT - Post-Seed Verification');
  console.log('========================================\n');

  await auditProductCount();
  await auditSlugsNotNull();
  await auditSlugsUnique();
  await auditSlugPattern();
  await auditSkuUnique();
  await auditCategoryFK();
  await auditCreatedByFK();
  await auditVariants();
  await auditNoCuidInSlug();

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

main()
  .catch((e) => {
    console.error('FAIL: Audit error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
