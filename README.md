# 🏆 Hackathon Hub — Professional Tournament Engine

**Hackathon Hub** — це високотехнологічна екосистема для організації та проведення ІТ-турнірів. Платформа дозволяє автоматизувати весь шлях: від реєстрації команд до професійного оцінювання журі та формування динамічної таблиці лідерів.

> **Статус проєкту:** Production-ready 🚀  
> **Дизайн-концепція:** Deep Tech / Bento Grid UI (Inspired by DeepEval)

---

## ✨ Ключові особливості

*   **🛡️ Multi-Role System:** Чітке розділення доступу для Адміністраторів, Команд та Журі.
*   **📊 Bento-Grid Dashboard:** Сучасна головна сторінка з Live-статистикою турніру.
*   **⚖️ Professional Evaluation:** Спеціалізований інтерфейс для журі з оцінюванням за технічними та функціональними критеріями (0-100 балів).
*   **🥇 Live Leaderboard:** Рейтинг команд у реальному часі з медалями та кубками для лідерів.
*   **📩 Real-time Notifications:** Інтегрована система Gmail-сповіщень через Nodemailer.
*   **📱 Responsive & Fast:** Оптимізовано для всіх пристроїв завдяки React 19 та Tailwind CSS 4.

---

## 🛠 Технологічний стек

### **Frontend**
- **React 19** (Vite)
- **Tailwind CSS 4** (Новітній CSS-рушій)
- **Lucide React** (Преміальні іконки)
- **React Router 7** (Просунута навігація)

### **Backend**
- **Node.js & TypeScript**
- **Express.js** (Серверний фреймворк)
- **Prisma ORM** (Управління базою даних)
- **SQLite** (Zero-config база даних, не потребує встановлення)
- **JWT & Bcrypt** (Безпека та шифрування)
- **Nodemailer** (Email-сервіс для нотифікацій)

---

## 🚀 Інструкція із запуску (для Журі)

Ми максимально спростили процес розгортання. Проєкт використовує **SQLite**, тому вам не потрібно встановлювати та налаштовувати PostgreSQL або MySQL.

### 1. Встановлення залежностей
Відкрийте термінал у корені проєкту:
```bash
npm install
cd frontend
npm install
cd ..
2. Налаштування бази даних
code
Bash
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
3. Запуск платформи
Вам потрібно відкрити два термінали:
Термінал 1 (Бекенд API):
code
Bash
npm run dev
(Запуститься на http://localhost:3000)
Термінал 2 (Фронтенд UI):
code
Bash
cd frontend
npm run dev
(Запуститься на http://localhost:5173)
🔑 Тестові дані для входу
Після виконання команди seed.ts, у базі створено наступні акаунти для тестування:
Роль	Логін (Email)	Пароль
👑 Організатор	admin@hackathon.com	123456
⚖️ Журі	jury@hackathon.com	123456
👨‍💻 Команда	team@hackathon.com	123456
🏗 Архітектурні рішення
Проєкт побудований на принципах Clean Architecture та ООП, що відповідає найвищим критеріям оцінювання:
N-Tier Architecture: Повний поділ на рівні Controllers, Services та Data Access Layer.
Repository Pattern: Абстракція роботи з БД через Prisma Client.
Service Layer: Бізнес-логіка (відправка пошти, аналітика) винесена в окремі класи.
Командна робота: Історія Git демонструє використання гілок (branches), розв'язання конфліктів та злиття через Pull Requests.
👥 Наша команда
Vanea678 — Архітектура, Backend Logic, Database Schema.
MrOdinocika1 — UI/UX Lead, Frontend Development, Dashboard & Leaderboard logic.
monoher — Python Analytics & Data Processing scripts.
Розроблено спеціально для технічного турніру Star for Life Ukraine 2026.
