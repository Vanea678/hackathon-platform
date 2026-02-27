import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export class AuthController {
  
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Невірний email або пароль' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Невірний email або пароль' });
      }

      // Створюємо токен для доступу
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      return res.status(500).json({ message: 'Помилка сервера' });
    }
  }
}
