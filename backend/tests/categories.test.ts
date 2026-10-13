import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('Categorias', () => {
  it('cria uma categoria', async () => {
    const res = await request(app).post('/categories').send({ name: 'Mercado' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: expect.any(Number), name: 'Mercado' });
  });

  it('retorna 400 quando o nome está vazio', async () => {
    const res = await request(app).post('/categories').send({ name: '   ' });

    expect(res.status).toBe(400);
  });

  it('retorna 409 quando a categoria já existe', async () => {
    await prisma.category.create({ data: { name: 'Mercado' } });

    const res = await request(app).post('/categories').send({ name: 'Mercado' });

    expect(res.status).toBe(409);
  });

  it('lista as categorias em ordem alfabética', async () => {
    await prisma.category.createMany({ data: [{ name: 'Transporte' }, { name: 'Lazer' }] });

    const res = await request(app).get('/categories');

    expect(res.status).toBe(200);
    expect(res.body.map((c: { name: string }) => c.name)).toEqual(['Lazer', 'Transporte']);
  });

  it('exclui uma categoria', async () => {
    const categoria = await prisma.category.create({ data: { name: 'Lazer' } });

    const res = await request(app).delete(`/categories/${categoria.id}`);

    expect(res.status).toBe(204);
    expect(await prisma.category.count()).toBe(0);
  });

  it('retorna 404 ao excluir categoria inexistente', async () => {
    const res = await request(app).delete('/categories/9999');

    expect(res.status).toBe(404);
  });

  it('retorna 400 quando o id é inválido', async () => {
    const res = await request(app).delete('/categories/abc');

    expect(res.status).toBe(400);
  });
});