import express from 'express';
import dotenv from 'dotenv';
import { AuthController } from './controllers/AuthController';

dotenv.config();

const app = express();
app.use(express.json());

const authController = new AuthController();

// Маршрут для входу
app.post('/api/auth/login', (req, res) => authController.login(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});