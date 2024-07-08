import { Injectable, UseGuards } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

export const users: User[] = [];

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async addUser(data: NewUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.databaseService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  async getUserByUsername(username: string): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { username } });
  }

  @UseGuards(GqlAuthGuard)
  async getUsers(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }
}
