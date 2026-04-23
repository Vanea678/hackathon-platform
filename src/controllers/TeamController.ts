import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TeamController {
  async register(req: Request, res: Response) {
    const { tournamentId, name, captainName, captainEmail, members, organization, socialLink } = req.body;

    try {
      // 1. Перевірка вікна реєстрації
      const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
      if (!tournament) return res.status(404).json({ message: "Турнір не знайдено" });

      const now = new Date();
      if (now < tournament.startDate || now > tournament.regEndDate) {
        return res.status(403).json({ message: "Реєстрація закрита або ще не почалася" });
      }

      // 2. Перевірка кількості учасників (мінімум 2)
      if (!members || members.length < 2) {
        return res.status(400).json({ message: "У команді має бути мінімум 2 учасники" });
      }

      // 3. Реєстрація через транзакцію (або все, або нічого)
      const team = await prisma.team.create({
        data: {
          name,
          tournamentId,
          captainName,
          captainEmail,
          organization,
          socialLink,
          members: {
            create: members.map((m: any) => ({
              fullName: m.fullName,
              email: m.email
            }))
          }
        }
      });

      res.status(201).json({ message: "Команду успішно зареєстровано!", team });
    } catch (error: any) {
      if (error.code === 'P2002') return res.status(400).json({ message: "Ця команда або капітан вже зареєстровані" });
      res.status(500).json({ message: "Помилка сервера" });
    }
  }
}