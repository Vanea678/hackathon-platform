import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Примусово завантажуємо .env ще раз для цього файлу
dotenv.config();

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_APP_PASSWORD;

    console.log("🛠 Спроба підключення до пошти:", user);
    
    if (!pass) {
        console.error("❌ ПОМИЛКА: Пароль додатка не знайдено в .env!");
    }

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass
      }
    });

    this.transporter.verify((error) => {
      if (error) {
        console.log("❌ Статус пошти: Помилка (Bad Credentials)");
      } else {
        console.log("✅ СТАТУС ПОШТИ: ПІДКЛЮЧЕНО! ЛИСТИ БУДУТЬ ЙТИ!");
      }
    });
  }

  async sendRegistrationEmail(toEmail: string, teamName: string, tournamentName: string) {
    try {
      await this.transporter.sendMail({
        from: `"Hackathon Hub" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Реєстрація успішна! 🚀",
        html: `<h2>Вітаємо, команда ${teamName}!</h2>`
      });
      console.log(`✉️ Лист надіслано на ${toEmail}`);
    } catch (e) {
      console.error("❌ Не вдалося надіслати лист");
    }
  }
}