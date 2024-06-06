import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/new-user.input';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a user', async () => {
    const newUser: NewUserInput = {
      username: 'testuser',
      password: 'password', // Add the password field
    };

    const user = await service.addUser(newUser);

    expect(user).toBeDefined();
    expect(user.username).toEqual(newUser.username);
    // add other assertions as necessary
  });

  it('should get users', async () => {
    const users = await service.getUsers();

    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });
});