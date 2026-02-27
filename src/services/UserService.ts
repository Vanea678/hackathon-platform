const { PrismaClient } = require('@prisma/client');
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ООП Клас для управління користувачами
export class UserService {
  
  // Метод для створення користувача (наприклад, для Директора, який додає вчителів)
  async createUser(data: { email: string; password: string; firstName: string; lastName: string; role: any }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role
      }
    });
  }

  // Метод для пошуку користувача за email
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }
}