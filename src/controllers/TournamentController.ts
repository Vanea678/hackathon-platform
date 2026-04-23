import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TournamentController {
  async create(req: Request, res: Response) {
    const { title, description, rules, startDate, regStartDate, regEndDate, maxTeams, roundsCount } = req.body;

    try {
      const tournament = await prisma.tournament.create({
        data: {
          title,
          description,
          rules,
          startDate: new Date(startDate),
          regStartDate: new Date(regStartDate),
          regEndDate: new Date(regEndDate),
          maxTeams: maxTeams ? parseInt(maxTeams) : null,
          roundsCount: parseInt(roundsCount) || 1,
          status: "DRAFT"
        }
      });
      res.status(201).json(tournament);
    } catch (error) {
      res.status(500).json({ message: "Помилка створення турніру" });
    }
  }

  async getAll(req: Request, res: Response) {
    const tournaments = await prisma.tournament.findMany({
      include: { _count: { select: { teams: true } } }
    });
    res.json(tournaments);
  }
}