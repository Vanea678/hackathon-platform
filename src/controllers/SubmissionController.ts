import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubmissionController {
  async submit(req: Request, res: Response) {
    const { teamId, taskId, githubUrl, videoUrl, description } = req.body;

    try {
      const submission = await prisma.submission.upsert({
        where: {
          teamId_taskId: { teamId, taskId }
        },
        update: {
          githubUrl,
          videoUrl,
          description
        },
        create: {
          teamId,
          taskId,
          githubUrl,
          videoUrl,
          description
        }
      });

      return res.json({ success: true, submission });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Помилка збереження роботи" });
    }
  }
}