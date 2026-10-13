import express from 'express';
import cors from 'cors';
import { categoryRoutes } from './modules/categories/category.routes';
import { errorHandler } from './middlewares/error-handler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/categories', categoryRoutes);

// O handler de erros é sempre o ÚLTIMO middleware
app.use(errorHandler);