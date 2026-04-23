import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class JuryController {
  async distributeSubmissions(req: Request, res: Response) {
    const { taskId } = req.body;
    const K = 2; // Мінімум 2 журі на роботу

    try {
      const submissions = await prisma.submission.findMany({ where: { taskId } });
      const juries = await prisma.user.findMany({ where: { role: 'JURY' } });

      if (juries.length < K) return res.status(400).json({ message: "Недостатньо журі!" });

      for (const sub of submissions) {
        // Рандомно вибираємо K членів журі для цієї роботи
        const shuffledJury = juries.sort(() => 0.5 - Math.random());
        const selectedJury = shuffledJury.slice(0, K);

        for (const jury of selectedJury) {
          await prisma.evaluation.upsert({
            where: { submissionId_juryId: { submissionId: sub.id, juryId: jury.id } },
            update: {},
            create: { submissionId: sub.id, juryId: jury.id }
          });
        }
      }

      res.json({ message: "Роботи успішно розподілені між журі! 🎲" });
    } catch (e) {
      res.status(500).json({ message: "Помилка розподілу" });
    }
  }
}