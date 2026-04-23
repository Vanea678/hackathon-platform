🏆 Hackathon Hub — Professional Tournament Engine
Hackathon Hub — це високотехнологічна екосистема для організації та проведення ІТ-турнірів. Платформа дозволяє автоматизувати весь шлях: від реєстрації команд до професійного оцінювання журі та формування динамічної таблиці лідерів.
Статус проєкту: Production-ready 🚀
Дизайн-концепція: Deep Tech / Bento Grid UI
✨ Ключові особливості
🛡️ Multi-Role System: Чітке розділення доступу для Адміністраторів, Команд та Журі.
📊 Bento-Grid Dashboard: Сучасна головна сторінка з Live-статистикою турніру.
⚖️ Professional Evaluation: Спеціалізований інтерфейс для журі з оцінюванням за технічними та функціональними критеріями (0-100 балів).
🥇 Live Leaderboard: Рейтинг команд у реальному часі з медалями та кубками для лідерів.
📩 Real-time Notifications: Інтегрована система Gmail-сповіщень про успішну реєстрацію та зміну статусів.
📱 Responsive & Fast: Оптимізовано для всіх пристроїв завдяки React 19 та Tailwind CSS 4.
🛠 Технологічний стек
Frontend
React 19 (Vite)
Tailwind CSS 4 (Modern CSS engine)
Lucide React (High-end iconography)
React Router 7 (Advanced routing)
Backend
Node.js & TypeScript
Express.js (Server framework)
Prisma ORM (Database management)
SQLite (Zero-config database)
JWT & Bcrypt (Security & Encryption)
Nodemailer (Email engine)
🚀 Інструкція із запуску (для Журі)
Ми максимально спростили процес розгортання. Проєкт використовує SQLite, тому вам не потрібно встановлювати сторонні бази даних.
1. Встановлення залежностей
code
Bash
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
Відкрийте два термінали:
Термінал 1 (API): npm run dev (запуститься на http://localhost:3000)
Термінал 2 (UI): cd frontend && npm run dev (запуститься на http://localhost:5173)
🔑 Тестові дані для входу
Після виконання команди seed.ts, у базі створено наступні акаунти:
Роль	Логін (Email)	Пароль
👑 Адмін	admin@hackathon.com	123456
⚖️ Журі	jury@hackathon.com	123456
👨‍💻 Команда	team@hackathon.com	123456
🏗 Архітектурні рішення
Проєкт побудований на принципах Clean Architecture та ООП:
N-Tier Architecture: Поділ на Controllers, Services та Data Access Layer.
Repository Pattern: Абстракція роботи з базою даних через Prisma Client.
Service Layer: Вся бізнес-логіка (відправка пошти, авторизація) винесена в окремі класи.
Git Flow: Історія розробки включає гілки (branches), Pull Requests та вирішення Merge Conflicts, що підтверджує якісну командну роботу.
👥 Наша команда
Vanea678 — Архітектура, Backend Logic, DB Schema.
MrOdinocika1 — UI/UX Design, Frontend Development, Dashboard & Leaderboard.
monoher — Data Processing & Analytics scripts.