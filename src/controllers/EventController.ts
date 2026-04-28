import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({
        orderBy: { date: 'asc' } // Сортуємо від найстарішої події до найновішої
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Помилка завантаження розкладу" });
    }
  }

  async createEvent(req: Request, res: Response) {
    const { tournamentId, title, description, type, date } = req.body;
    try {
      const newEvent = await prisma.event.create({
        data: { tournamentId, title, description, type, date: new Date(date) }
      });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: "Помилка створення події" });
    }
  }
}