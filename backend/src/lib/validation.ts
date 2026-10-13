import { z } from 'zod';

// Converte o :id da URL (string) em número inteiro positivo, ou gera erro 400
export const idParamSchema = z.coerce.number().int().positive();