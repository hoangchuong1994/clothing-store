export type RepositoryMode = 'STATIC' | 'PRISMA' | 'AUTO';

export function getRepositoryMode(): RepositoryMode {
  const mode = process.env.REPOSITORY_MODE?.toUpperCase();
  if (mode === 'PRISMA' || mode === 'STATIC' || mode === 'AUTO') {
    return mode;
  }
  return 'STATIC';
}

export function isPrismaAvailable(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function resolveEffectiveMode(): 'STATIC' | 'PRISMA' {
  const mode = getRepositoryMode();
  if (mode === 'STATIC') return 'STATIC';
  if (mode === 'PRISMA') return 'PRISMA';
  // AUTO: use PRISMA if DATABASE_URL is set, else STATIC
  return isPrismaAvailable() ? 'PRISMA' : 'STATIC';
}
