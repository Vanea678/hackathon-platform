import express from 'express';
import cors from 'cors'; // Імпорт бібліотеки
import dotenv from 'dotenv';
import { AuthController } from './controllers/AuthController';

dotenv.config();

const app = express();

// --- НАЛАШТУВАННЯ (Middlewares) ---
app.use(cors()); // Дозволяємо фронтенду робити запити
app.use(express.json()); // Дозволяємо читати JSON

const authController = new AuthController();

// --- МАРШРУТИ (Routes) ---
app.get('/', (req, res) => {
  res.send('🚀 LMS API is running...');
});

app.post('/api/auth/login', (req, res) => authController.login(req, res));

// --- ЗАПУСК ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});