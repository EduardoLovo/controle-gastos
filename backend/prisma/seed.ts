import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const names = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Salário'];

  for (const name of names) {
    // upsert = cria se não existir. Assim o seed pode rodar várias vezes.
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Seed concluído');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());