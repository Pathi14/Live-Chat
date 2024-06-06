import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';

export const users: User[] = [];

@Injectable()
export class UsersService {
  async addUser(data: NewUserInput): Promise<User> {
    const user: User = {
      ...data,
      id: `user#${users.length + 1}`,
      creationDate: new Date(),
    };

    users.push(user);

    return user;
  }

  async getUsers(): Promise<User[]> {
    return users;
  }
}
