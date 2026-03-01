import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ВАЖЛИВО: має бути слово export
export class DashboardController {
  async getStats(req: Request, res: Response) {
    try {
      const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } });
      const teachers = await prisma.user.findMany({ 
        where: { role: 'TEACHER' },
        orderBy: { lastName: 'asc' }
      });
      const studentsCount = await prisma.user.count({ where: { role: 'STUDENT' } });
      const classesCount = await prisma.class.count();

      return res.json({
        subjects,
        teachers,
        stats: {
          students: studentsCount,
          classes: classesCount
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Помилка при завантаженні статистики' });
    }
  }
}