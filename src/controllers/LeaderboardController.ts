import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LeaderboardController {
  async getLeaderboard(req: Request, res: Response) {
    try {
      // 1. Отримуємо команди разом із їхніми сабмітами та оцінками
      const teams = await prisma.team.findMany({
        include: {
          submissions: {
            include: {
              evaluations: true
            }
          }
        }
      });

      // 2. Мапуємо дані: вираховуємо середні бали
      const leaderboard = teams.map(team => {
        const submission = team.submissions[0]; // Беремо останній сабміт
        if (!submission || submission.evaluations.length === 0) {
          return { name: team.name, tech: 0, func: 0, ui: 0, total: 0, status: 'No Evaluation' };
        }

        const evals = submission.evaluations;
        const count = evals.length;

        // Рахуємо середнє по категоріях
        const avgTech = evals.reduce((sum, e) => sum + (e.scoreTech || 0), 0) / count;
        const avgFunc = evals.reduce((sum, e) => sum + (e.scoreFunc || 0), 0) / count;
        const avgUI = evals.reduce((sum, e) => sum + (e.scoreUI || 0), 0) / count;
        
        const finalTotal = (avgTech + avgFunc + avgUI); // Сума середніх

        return {
          id: team.id,
          name: team.name,
          captain: team.captainEmail,
          tech: Math.round(avgTech),
          func: Math.round(avgFunc),
          ui: Math.round(avgUI),
          total: parseFloat(finalTotal.toFixed(1)),
          evalCount: count
        };
      });

      // 3. Сортуємо за загальним балом (від більшого до меншого)
      const sortedLeaderboard = leaderboard.sort((a, b) => b.total - a.total);

      res.json(sortedLeaderboard);
    } catch (e) {
      res.status(500).json({ message: "Помилка формування таблиці" });
    }
  }
}