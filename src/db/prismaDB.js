import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Connected successfully. Users:', users);
}

main()
  .catch((e) => console.error('Connection failed:', e))
  .finally(() => prisma.$disconnect());