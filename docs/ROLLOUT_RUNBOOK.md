# Production Rollout Runbook

## Migration: STATIC → PRISMA Product Repository

---

## Pre-Rollout Checklist

### Local Environment

- [ ] PostgreSQL running locally
- [ ] `DATABASE_URL` set in `.env`
- [ ] `pnpm install` completed
- [ ] `npx prisma migrate dev` completed
- [ ] `npx tsx prisma/seed.ts` completed
- [ ] `npx tsx scripts/verification/01-db-audit.ts` → **PASS**
- [ ] `npx tsx scripts/verification/02-runtime-identity-audit.ts` → **PASS**
- [ ] `npx tsx scripts/verification/03-parity-check.ts` → **PASS**
- [ ] `npx tsx scripts/verification/04-smoke-test.ts` → **PASS**
- [ ] No cuid leakage detected in any test output
- [ ] `REPOSITORY_MODE=STATIC pnpm dev` → verify UI works
- [ ] `REPOSITORY_MODE=PRISMA pnpm dev` → verify UI works
- [ ] Cart add/remove/merge works in both modes

### Staging Environment

- [ ] PostgreSQL provisioned
- [ ] `DATABASE_URL` configured in environment
- [ ] Prisma migrations applied: `npx prisma migrate deploy`
- [ ] Seed data loaded: `npx tsx prisma/seed.ts`
- [ ] DB audit passes: `npx tsx scripts/verification/01-db-audit.ts`
- [ ] Runtime audit passes with `REPOSITORY_MODE=PRISMA`
- [ ] Parity check passes
- [ ] Smoke test passes
- [ ] Load test with `REPOSITORY_MODE=AUTO` (PRISMA preferred)
- [ ] No cuid values in browser DevTools Network tab
- [ ] No cuid values in server logs
- [ ] Cart persistence verified across page refreshes
- [ ] Guest → user cart merge verified
- [ ] Checkout payload verified in staging

### Production Environment

- [ ] **All staging checks PASS**
- [ ] Database backup taken
- [ ] Rollback plan documented and rehearsed
- [ ] Monitoring dashboards ready
- [ ] Error alerting configured
- [ ] Feature flag ready (`REPOSITORY_MODE` env var)
- [ ] Deploy with `REPOSITORY_MODE=STATIC` first (verify deploy works)
- [ ] Switch to `REPOSITORY_MODE=AUTO`
- [ ] Monitor for 1 hour
- [ ] If stable, switch to `REPOSITORY_MODE=PRISMA`
- [ ] Monitor for 24 hours
- [ ] Remove STATIC fallback code (next release cycle)

---

## Rollout Strategy

### Phase 1: Deploy with STATIC (Day 1)

```bash
REPOSITORY_MODE=STATIC
```

Deploy the new codebase with repository abstraction but keep STATIC mode.
This validates the abstraction layer doesn't break existing behavior.

### Phase 2: Enable AUTO mode (Day 2)

```bash
REPOSITORY_MODE=AUTO
DATABASE_URL=postgresql://...
```

AUTO mode uses PRISMA when DATABASE_URL is available, falls back to STATIC.
Monitor:
- Error rates
- Response times
- Cart operations
- Checkout completions

### Phase 3: Force PRISMA mode (Day 3+)

```bash
REPOSITORY_MODE=PRISMA
DATABASE_URL=postgresql://...
```

Only after confirming:
- SQL audit PASS
- Runtime smoke PASS
- No cuid leakage in logs/network
- Parity verified
- Checkout stable for 24h

---

## AUTO Mode Enable Conditions

AUTO mode may ONLY be enabled when ALL of the following are true:

1. **SQL audit PASS**: `01-db-audit.ts` returns exit code 0
2. **Runtime smoke PASS**: `04-smoke-test.ts` returns exit code 0
3. **No cuid leakage**: No cuid pattern detected in:
   - API responses
   - Browser localStorage/sessionStorage
   - Network payloads
   - Server logs
4. **Parity verified**: `03-parity-check.ts` shows no FAIL results
5. **Checkout stable**: At least 10 successful checkout flows in staging

---

## Rollback Plan

### Immediate Rollback (< 5 minutes)

```bash
# Change env var
REPOSITORY_MODE=STATIC

# Restart application
# No database changes needed - STATIC mode ignores DB entirely
```

### Database Rollback (if schema needs reverting)

```bash
# List migrations
npx prisma migrate status

# Rollback last migration (if needed)
npx prisma migrate resolve --rolled-back <migration_name>
```

### Emergency Procedures

1. **Cuid leakage detected in production**:
   - Immediately set `REPOSITORY_MODE=STATIC`
   - Restart all instances
   - Audit affected sessions/carts
   - Investigate mapping layer

2. **Cart data corruption**:
   - Set `REPOSITORY_MODE=STATIC`
   - Clear affected cart sessions
   - Notify affected users

3. **Database connection failure**:
   - If `REPOSITORY_MODE=AUTO`: system auto-falls back to STATIC
   - If `REPOSITORY_MODE=PRISMA`: switch to STATIC immediately

---

## Observability & Logging Recommendations

### Required Logging

```typescript
// Log repository mode on startup
console.log(`[REPOSITORY] Mode: ${getRepositoryMode()}, Effective: ${resolveEffectiveMode()}`);

// Log identity violations
// Already built into DTO layer - throws on cuid leakage

// Log cart operations
console.log(`[CART] add sessionId=${sessionId} productId=${productId}`);
console.log(`[CART] merge guest=${guestId} -> user=${userId}`);
console.log(`[CART] checkout sessionId=${sessionId} items=${count}`);
```

### Monitoring Dashboards

1. **Identity Integrity**:
   - Count of `IDENTITY_VIOLATION` errors (should be 0)
   - Count of `CUID_LEAKAGE` errors (should be 0)

2. **Repository Performance**:
   - `product.list()` latency (STATIC vs PRISMA)
   - `product.getById()` latency
   - `cart.hydrate()` latency

3. **Cart Operations**:
   - Cart creation rate
   - Cart merge rate
   - Checkout completion rate

4. **Error Rates**:
   - 5xx errors by endpoint
   - Prisma connection errors
   - Repository fallback events (AUTO mode)

### Alert Rules

| Alert | Condition | Action |
|-------|-----------|--------|
| Cuid Leakage | Any `CUID_LEAKAGE` error | Page on-call, rollback to STATIC |
| Identity Violation | Any `IDENTITY_VIOLATION` error | Page on-call, investigate |
| DB Connection Error | > 5 errors in 1 min | Alert, AUTO mode will fallback |
| Cart Corruption | Cart item with non-canonical ID | Page on-call, rollback |
| Checkout Failure | > 1% failure rate | Alert, investigate |

---

## Verification Commands Reference

```bash
# Database audit (requires DATABASE_URL)
npx tsx scripts/verification/01-db-audit.ts

# Runtime identity audit (works with STATIC)
npx tsx scripts/verification/02-runtime-identity-audit.ts

# Parity check (STATIC baseline, optional PRISMA comparison)
DATABASE_URL=... npx tsx scripts/verification/03-parity-check.ts

# Smoke test (works with STATIC)
npx tsx scripts/verification/04-smoke-test.ts

# SQL queries (run against PostgreSQL directly)
psql $DATABASE_URL -f scripts/verification/01-db-audit.sql
```
