import { PrismaClient } from '@prisma/client';

// Uma única instância para a aplicação inteira (evita abrir conexões demais)
export const prisma = new PrismaClient();