import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardController {
  async getStats(req: Request, res: Response) {
    try {
      const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } });
      const teachers = await prisma.user.findMany({ where: { role: 'TEACHER' } });
      
      // ДОДАЄМО: Отримуємо ВСІХ учнів разом з їхнім класом
      const students = await prisma.user.findMany({ 
        where: { role: 'STUDENT' },
        include: { class: true }, // Беремо назву класу з бази
        orderBy: { lastName: 'asc' }
      });
      
      const classesCount = await prisma.class.count();

      return res.json({
        subjects,
        teachers,
        students, // Тепер бекенд віддає масив учнів!
        stats: {
          students: students.length,
          classes: classesCount
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Помилка при завантаженні статистики' });
    }
  }
}