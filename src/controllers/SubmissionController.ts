import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubmissionController {
  async submit(req: Request, res: Response) {
    const { teamId, taskId, githubUrl, videoUrl, liveDemoUrl, description } = req.body;

    try {
      // 1. Знаходимо завдання, щоб перевірити дедлайн
      const task = await prisma.task.findUnique({ where: { id: taskId } });
      if (!task) return res.status(404).json({ message: "Завдання не знайдено" });

      // 2. ПЕРЕВІРКА ДЕДЛАЙНУ (Логіка "SubmissionClosed")
      const now = new Date();
      if (now > task.deadline) {
        return res.status(403).json({ message: "SubmissionClosed: Час здачі проєкту вичерпано!" });
      }

      // 3. Зберігаємо або оновлюємо (Upsert)
      const submission = await prisma.submission.upsert({
        where: { teamId_taskId: { teamId, taskId } },
        update: { githubUrl, videoUrl, liveDemoUrl, description },
        create: { teamId, taskId, githubUrl, videoUrl, liveDemoUrl, description }
      });

      res.json({ message: "Проєкт успішно завантажено! ✅", submission });
    } catch (error) {
      res.status(500).json({ message: "Помилка при завантаженні даних" });
    }
  }
}