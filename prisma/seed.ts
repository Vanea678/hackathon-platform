import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      passwordHash: passwordHash,
      firstName: 'Ivan',
      lastName: 'Director',
      role: 'HEAD_TEACHER', 
    },
  });

  console.log('✅ Базу заповнено! Email: admin@school.com | Pass: admin123');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());