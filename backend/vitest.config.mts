import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    // Os testes usam o mesmo banco, então rodam um arquivo de cada vez
    fileParallelism: false,
  },
});