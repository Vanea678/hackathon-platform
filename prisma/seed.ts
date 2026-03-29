import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Заповнюю базу для Турніру...');
  const defaultPassword = await bcrypt.hash('123456', 10);

  // 1. Організатор (Адмін)
  await prisma.user.upsert({
    where: { email: 'admin@hackathon.com' },
    update: {},
    create: { email: 'admin@hackathon.com', passwordHash: defaultPassword, fullName: 'Головний Організатор', role: 'ADMIN' },
  });

  // 2. Журі
  await prisma.user.upsert({
    where: { email: 'jury@hackathon.com' },
    update: {},
    create: { email: 'jury@hackathon.com', passwordHash: defaultPassword, fullName: 'Суддя Максим', role: 'JURY' },
  });

  // 3. Капітан Команди
  await prisma.user.upsert({
    where: { email: 'team@hackathon.com' },
    update: {},
    create: { email: 'team@hackathon.com', passwordHash: defaultPassword, fullName: 'Іван (Капітан)', role: 'TEAM' },
  });

  // 4. Тестовий турнір
  await prisma.tournament.create({
    data: {
      title: 'Star for Life Hackathon 2026',
      description: 'Головний ІТ-турнір для підлітків України.',
      status: 'RUNNING',
      startDate: new Date(),
      regEndDate: new Date(new Date().getTime() + 86400000 * 7), // +7 днів
    }
  });

  console.log('✅ Базу Турніру успішно створено!');
}

main().catch(console.error).finally(() => prisma.$disconnect());