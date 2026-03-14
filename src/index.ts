import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AuthController } from './controllers/AuthController';
import { DashboardController } from './controllers/DashboardController'; // Має бути у { }
import { GradeController } from './controllers/GradeController';
const gradeController = new GradeController();
// 1. Спочатку завантажуємо налаштування
dotenv.config();

const app = express();

// 2. Налаштування (Middlewares) - Мають бути ПЕРЕД маршрутами
app.use(cors());
app.use(express.json());
app.post('/api/grades/save', (req, res) => gradeController.saveGrade(req, res));
// 3. Ініціалізація контролерів
const authController = new AuthController();
const dashboardController = new DashboardController();

// 4. Маршрути (Routes)
app.get('/', (req, res) => {
  res.send('🚀 LMS API is running...');
});

// Авторизація
app.post('/api/auth/login', (req, res) => authController.login(req, res));

// Дашборд (Статистика)
app.get('/api/dashboard/stats', (req, res) => dashboardController.getStats(req, res));

// 5. Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер успішно запущено на http://localhost:${PORT}`);
});