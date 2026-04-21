import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { EmailService } from '../services/EmailService'; // ДОДАНО
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const userService = new UserService();
const emailService = new EmailService(); // ДОДАНО
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export class AuthController {
  
  // 1. РЕЄСТРАЦІЯ
  async register(req: Request, res: Response) {
    const { email, password, fullName, teamName } = req.body;

    try {
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Цей email вже зареєстровано' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Створюємо користувача та команду (транзакція)
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          fullName,
          role: 'TEAM',
          team: {
            create: {
              name: teamName,
              // Прив'язуємо до першого знайденого турніру
              tournament: { connect: { id: (await prisma.tournament.findFirst())?.id } }
            }
          }
        }
      });

      return res.status(201).json({ message: 'Команду успішно зареєстровано!', userId: user.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Помилка при реєстрації' });
    }
  }

  // 2. ВХІД
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Невірний email або пароль' });

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) return res.status(401).json({ message: 'Невірний email або пароль' });

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

      // Відправка тестового листа для Адміна
      if (user.role === 'ADMIN') {
        await emailService.sendRegistrationEmail('vaneaignatiuc0@gmail.com', 'Admin System', 'Hackathon Hub');
      }

      return res.json({ 
        token, 
        user: { id: user.id, email: user.email, role: user.role, fullName: user.fullName } 
      });

    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  }
}