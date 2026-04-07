import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { EmailService } from '../services/EmailService'; // 1. ДОДАЙ ІМПОРТ
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userService = new UserService();
const emailService = new EmailService(); // 2. СТВОРИ ЕКЗЕМПЛЯР СЕРВІСУ

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Невірний email або пароль' });

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) return res.status(401).json({ message: 'Невірний email або пароль' });

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

      // 3. ТЕСТОВЕ ВІДПРАВЛЕННЯ ЛИСТА
      // Якщо заходить Адмін, відправляємо лист на ТВОЮ пошту
      if (user.role === 'ADMIN') {
        // Ми примусово шлемо на твою пошту, щоб ти точно отримав лист
        emailService.sendRegistrationEmail('vaneaignatiuc0@gmail.com', 'Super Coders', 'Star for Life Hackathon');
      }

      return res.json({ 
        token, 
        user: { id: user.id, email: user.email, role: user.role, firstName: user.fullName } 
      });

    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  }
}