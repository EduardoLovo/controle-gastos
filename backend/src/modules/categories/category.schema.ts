import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório').max(50),
});