import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GradeController {
  // Метод для збереження або оновлення оцінки/відвідуваності
  async saveGrade(req: Request, res: Response) {
    const { studentId, subjectId, teacherId, date, grade, attendance } = req.body;

    try {
      const record = await prisma.gradebook.upsert({
        where: {
          // Унікальний ключ: один учень по одному предмету в один день
          studentId_subjectId_date: {
            studentId,
            subjectId,
            date: new Date(date)
          }
        },
        update: {
          grade: grade ? parseInt(grade) : null,
          attendance,
          teacherId
        },
        create: {
          studentId,
          subjectId,
          teacherId,
          date: new Date(date),
          grade: grade ? parseInt(grade) : null,
          attendance
        }
      });

      return res.json({ message: "Дані успішно збережено в базі!", record });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка при збереженні в БД" });
    }
  }
}