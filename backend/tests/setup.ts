import { afterAll, beforeEach } from 'vitest';
import { prisma } from '../src/lib/prisma';

// Cada teste começa com o banco limpo (isolamento entre testes)
beforeEach(async () => {
  await prisma.category.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});