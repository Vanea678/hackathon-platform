import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskController {
  // Створення завдання адміном
  async create(req: Request, res: Response) {
    const { tournamentId, title, description, techRequirements, mustHave, startTime, deadline } = req.body;
    try {
      const task = await prisma.task.create({
        data: {
          tournamentId,
          title,
          description,
          techRequirements,
          mustHaveChecklist: JSON.stringify(mustHave),
          startTime: new Date(startTime),
          deadline: new Date(deadline),
          status: "DRAFT"
        }
      });
      res.status(201).json(task);
    } catch (e) {
      res.status(500).json({ message: "Error creating task" });
    }
  }

  // Отримання активного завдання для команд
  async getActive(req: Request, res: Response) {
    try {
      const task = await prisma.task.findFirst({
        where: { status: "ACTIVE" },
        orderBy: { startTime: 'desc' }
      });
      if (!task) return res.status(404).json({ message: "No active tasks found" });
      
      // Розпаковуємо JSON чек-лист
      const formattedTask = { ...task, mustHaveChecklist: JSON.parse(task.mustHaveChecklist) };
      res.json(formattedTask);
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }
}