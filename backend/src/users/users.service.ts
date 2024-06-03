import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';

@Injectable()
export class UsersService {
  async addUser(data: NewUserInput): Promise<User> {
    return { id: 'test', username: 'test', creationDate: new Date() };
  }

  async getUsers(): Promise<User[]> {
    return [
      { id: 'test', username: 'test', creationDate: new Date() },
      { id: 'test2', username: 'test2', creationDate: new Date() },
    ];
  }
}
