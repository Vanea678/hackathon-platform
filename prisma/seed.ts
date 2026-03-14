import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Починаю генерацію бази даних...');

  const defaultPassword = await bcrypt.hash('123456', 10);

  // 1. СТВОРЮЄМО ДИРЕКТОРА ТА ВЧИТЕЛЯ
  await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: { email: 'admin@school.com', passwordHash: defaultPassword, firstName: 'Ivan', lastName: 'Director', role: 'HEAD_TEACHER' },
  });

  await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: { email: 'teacher@school.com', passwordHash: defaultPassword, firstName: 'Олена', lastName: 'Петренко', role: 'TEACHER' },
  });

  // 2. СТВОРЮЄМО ПРЕДМЕТИ
  const subjects = [
    { name: 'Математика', description: 'Алгебра та геометрія' },
    { name: 'Програмування', description: 'Основи Web-розробки' },
    { name: 'Історія', description: 'Історія України' },
    { name: 'Англійська мова', description: 'Рівень B1-B2' }
  ];

  for (const sub of subjects) {
    await prisma.subject.upsert({ where: { name: sub.name }, update: {}, create: sub });
  }

  // 3. СТВОРЮЄМО КЛАСИ
  const classNames = ['10-А', '10-Б', '11-А'];
  const classIds: Record<string, string> = {};

  for (const name of classNames) {
    const newClass = await prisma.class.upsert({
      where: { name },
      update: {},
      create: { name }
    });
    classIds[name] = newClass.id; // Зберігаємо ID класу, щоб додати туди учнів
  }

  // 4. ГЕНЕРУЄМО УЧНІВ ТА РОЗПОДІЛЯЄМО ПО КЛАСАХ
  const studentsToCreate = [
    { f: 'Андрій', l: 'Шевченко', e: 'andriy@school.com', c: '10-А' },
    { f: 'Марія', l: 'Коваль', e: 'maria@school.com', c: '10-А' },
    { f: 'Олександр', l: 'Зінченко', e: 'alex@school.com', c: '10-А' },
    { f: 'Софія', l: 'Ткаченко', e: 'sofia@school.com', c: '10-Б' },
    { f: 'Максим', l: 'Бондаренко', e: 'max@school.com', c: '10-Б' },
    { f: 'Дарина', l: 'Мельник', e: 'daryna@school.com', c: '10-Б' },
    { f: 'Іван', l: 'Франко', e: 'ivan@school.com', c: '11-А' },
    { f: 'Вікторія', l: 'Бойко', e: 'vika@school.com', c: '11-А' },
    { f: 'Дмитро', l: 'Кравченко', e: 'dima@school.com', c: '11-А' },
    { f: 'Анна', l: 'Олійник', e: 'anna@school.com', c: '11-А' }
  ];

  let studentCount = 0;
  for (const s of studentsToCreate) {
    await prisma.user.upsert({
      where: { email: s.e },
      update: {},
      create: {
        email: s.e,
        firstName: s.f,
        lastName: s.l,
        passwordHash: defaultPassword,
        role: 'STUDENT',
        classId: classIds[s.c] // Призначаємо учня в конкретний клас
      }
    });
    studentCount++;
  }

  console.log('✅ Базу успішно згенеровано!');
  console.log(`🎓 Додано класів: ${classNames.length}`);
  console.log(`👨‍🎓 Додано учнів: ${studentCount}`);
  console.log('🔑 Універсальний пароль для всіх: 123456');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());