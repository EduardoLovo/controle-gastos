import { Router } from 'express';
import { prisma } from '../../lib/prisma';
import { idParamSchema } from '../../lib/validation';
import { createCategorySchema } from './category.schema';

export const categoryRoutes = Router();

categoryRoutes.get('/', async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json(categories);
});

categoryRoutes.post('/', async (req, res) => {
  const data = createCategorySchema.parse(req.body);
  const category = await prisma.category.create({ data });
  res.status(201).json(category);
});

categoryRoutes.delete('/:id', async (req, res) => {
  const id = idParamSchema.parse(req.params.id);
  await prisma.category.delete({ where: { id } });
  res.status(204).send();
});
