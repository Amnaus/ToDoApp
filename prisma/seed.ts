import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const todo = await prisma.todo.create({
    data: {
      title: 'Test Todo',
    },
  });

  console.log('Seeded todo:', todo);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
