---
name: testing-clothing-store
description: Test the clothing-store Next.js ecommerce app end-to-end. Use when verifying UI changes, product data updates, or repository infrastructure.
---

# Testing the Clothing Store App

## Prerequisites

- Node.js 22.13+ (use `nvm use 22` if needed)
- pnpm 11+ (install via `npm install -g pnpm@latest`)
- After installing dependencies, run `pnpm approve-builds --all` to approve Prisma and other build scripts

## Local Dev Setup

```bash
cd /home/ubuntu/repos/clothing-store
pnpm install
pnpm approve-builds --all  # Required for Prisma engines
pnpm dev  # Starts on http://localhost:3000
```

## App Structure

- **Stack**: Next.js 16 (Turbopack), TypeScript, Tailwind CSS, next-intl (i18n)
- **Locale prefix**: All routes are prefixed with locale, e.g. `/en/shop`, `/vi/shop`
- **Default locale**: `en`
- **Product data**: Currently imported directly from `src/data/dummy-data.ts` (static)
- **Product IDs**: Numeric (1-13) in static data, used in URLs like `/en/product/13`
- **Featured products**: Separate data source at `src/data/products.ts` (used on home page)
- **Cart**: Empty array placeholder (`const cartItems = []`), no persistence yet
- **Auth**: Basic login/register pages with dummy users in `src/data/dummy-data.ts`

## Key Pages to Test

| Page | URL | What to verify |
|------|-----|----------------|
| Home | `/en` | Hero, Categories, Featured Drops, Blog Preview, Newsletter |
| Shop | `/en/shop` | Product grid, category filters, sort dropdown |
| Product Detail | `/en/product/{id}` | Name, price, colors, sizes, related products |
| Cart | `/en/cart` | Empty state message, "Continue Shopping" link |
| Blog | `/en/blog` | Blog post list |
| About | `/en/about` | Team members, company info |

## Verification Scripts

If the repository pattern infrastructure exists (from PR #1):

```bash
pnpm verify:identity   # Runtime identity audit (21 checks)
pnpm verify:smoke      # Cart lifecycle smoke test (19 checks)
pnpm verify:parity     # STATIC vs PRISMA comparison (4 checks)
pnpm verify:all        # Run all verification suites
```

For database verification (requires PostgreSQL + DATABASE_URL):
```bash
pnpm verify:db         # Database audit (requires seeded DB)
```

## Testing Tips

- The shop page renders all products from the `PRODUCTS` array in `src/data/dummy-data.ts`
- Category filtering is client-side — clicking a category button filters the `PRODUCTS` array by `product.category.toLowerCase()`
- Product detail pages use `parseInt(id)` from the URL to find the product
- The home page Featured Products section uses a separate data source (`src/data/products.ts`), not `dummy-data.ts`
- Port 3000 might be in use from a previous session — use `fuser -k 3000/tcp` to free it
- `lsof` is not available on this environment; use `fuser` instead
- The app may show a "2 Issues" badge in dev mode — this is a pre-existing Next.js dev warning, not a bug
- No CI is configured on this repo

## Devin Secrets Needed

None required for local testing. If testing PRISMA mode, a `DATABASE_URL` environment variable pointing to a PostgreSQL instance is needed.
