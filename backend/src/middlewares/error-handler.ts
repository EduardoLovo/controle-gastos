import type { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Dados inválidos enviados pelo cliente
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Dados inválidos', issues: err.issues });
    return;
  }

  // Erros conhecidos do banco
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({ message: 'Registro já existe' });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Registro não encontrado' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(409).json({ message: 'Registro relacionado inexistente ou em uso' });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
};