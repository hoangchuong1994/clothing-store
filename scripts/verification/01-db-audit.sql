-- ========================================
-- SQL Verification Queries
-- Run against PostgreSQL after seeding
-- ========================================

-- 1. Product count == 13
SELECT
  CASE WHEN COUNT(*) = 13 THEN 'PASS' ELSE 'FAIL' END AS status,
  'Product count' AS check_name,
  COUNT(*) AS actual_count,
  13 AS expected_count
FROM products;

-- 2. slug NOT NULL
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'slug NOT NULL' AS check_name,
  COUNT(*) AS null_count
FROM products
WHERE slug IS NULL OR slug = '';

-- 3. slug UNIQUE (no duplicates)
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'slug UNIQUE' AS check_name,
  COUNT(*) AS duplicate_count
FROM (
  SELECT slug, COUNT(*) AS cnt
  FROM products
  GROUP BY slug
  HAVING COUNT(*) > 1
) duplicates;

-- 4. All expected slugs present
SELECT
  slug,
  CASE WHEN slug IS NOT NULL THEN 'PRESENT' ELSE 'MISSING' END AS status
FROM (
  VALUES
    ('prod-001'), ('prod-002'), ('prod-003'), ('prod-004'),
    ('prod-005'), ('prod-006'), ('prod-007'), ('prod-008'),
    ('prod-009'), ('prod-010'), ('prod-011'), ('prod-012'),
    ('prod-013')
) AS expected(slug)
LEFT JOIN products p ON p.slug = expected.slug
ORDER BY expected.slug;

-- 5. SKU uniqueness
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'SKU unique' AS check_name,
  COUNT(*) AS duplicate_count
FROM (
  SELECT sku, COUNT(*) AS cnt
  FROM products
  GROUP BY sku
  HAVING COUNT(*) > 1
) duplicates;

-- 6. categoryId FK valid
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'categoryId FK valid' AS check_name,
  COUNT(*) AS orphan_count
FROM products p
LEFT JOIN categories c ON p."categoryId" = c.id
WHERE c.id IS NULL;

-- 7. createdById FK valid
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'createdById FK valid' AS check_name,
  COUNT(*) AS orphan_count
FROM products p
LEFT JOIN users u ON p."createdById" = u.id
WHERE u.id IS NULL;

-- 8. No cuid leakage in slug (slug should NOT match cuid pattern)
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'No cuid in slug' AS check_name,
  COUNT(*) AS cuid_count
FROM products
WHERE slug ~ '^c[a-z0-9]{20,}$';

-- 9. Variant coverage
SELECT
  p.slug,
  COUNT(pv.id) AS variant_count,
  CASE WHEN COUNT(pv.id) > 0 THEN 'PASS' ELSE 'WARNING' END AS status
FROM products p
LEFT JOIN product_variants pv ON p.id = pv."productId"
GROUP BY p.slug
ORDER BY p.slug;

-- 10. No negative stock
SELECT
  CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS status,
  'No negative stock' AS check_name,
  COUNT(*) AS negative_count
FROM product_variants
WHERE stock < 0;

-- 11. Full product summary
SELECT
  p.slug,
  p.name,
  p.sku,
  p.price,
  c.name AS category,
  u.email AS created_by,
  (SELECT COUNT(*) FROM product_images pi WHERE pi."productId" = p.id) AS image_count,
  (SELECT COUNT(*) FROM product_variants pv WHERE pv."productId" = p.id) AS variant_count,
  (SELECT COALESCE(SUM(pv.stock), 0) FROM product_variants pv WHERE pv."productId" = p.id) AS total_stock
FROM products p
JOIN categories c ON p."categoryId" = c.id
JOIN users u ON p."createdById" = u.id
ORDER BY p.slug;
