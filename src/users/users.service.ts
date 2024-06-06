import { Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

export const users: User[] = [];

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async addUser(data: NewUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }
}
