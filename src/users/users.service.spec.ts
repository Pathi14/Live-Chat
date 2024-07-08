import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';
import { NewUserInput } from './dto/new-user.input';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Mock de la bibliothèque bcrypt pour les tests
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: DatabaseService;

  // Configuration du module de test avant chaque test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, DatabaseService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  // Nettoyage des mocks après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addUser', () => {
    // Configuration du module de test avant chaque test de addUser
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService, DatabaseService],
      }).compile();

      service = module.get<UsersService>(UsersService);
      databaseService = module.get<DatabaseService>(DatabaseService);
    });

    // Nettoyage des mocks après chaque test de addUser
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should add a new user with hashed password', async () => {
      const newUser: NewUserInput = {
        username: 'testuser',
        password: 'testpassword',
      };

      const hashedPassword =
        '$2b$10$hZEbHQ2kgitKFLOojX5tT.2iIt8ilE5tkOPiRkOzk6h8QTcMlsNJe';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const createdUser: User = {
        id: 'user1',
        username: 'testuser',
        password: hashedPassword,
        creationDate: new Date('2024-07-07T12:34:45.014Z'),
      };

      // Mock de la méthode create de databaseService
      databaseService.user.create = jest.fn().mockResolvedValue(createdUser);

      const result = await service.addUser(newUser);

      // Vérification que la méthode create a été appelée avec les bons paramètres
      expect(databaseService.user.create).toHaveBeenCalledWith({
        data: {
          username: newUser.username,
          password: hashedPassword,
        },
      });

      // Vérification que le résultat est correct
      expect(result).toEqual(createdUser);
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user by username', async () => {
      const username = 'testuser';
      const expectedUser: User = {
        id: 'user1',
        username,
        password: 'hashedpassword',
        creationDate: new Date(),
      };

      // Mock de la méthode findUnique de databaseService
      jest
        .spyOn(databaseService.user, 'findUnique')
        .mockResolvedValue(expectedUser);

      const result = await service.getUserByUsername(username);

      // Vérification que la méthode findUnique a été appelée avec les bons paramètres
      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { username },
      });
      // Vérification que le résultat est correct
      expect(result).toEqual(expectedUser);
    });

    it('should return null if user is not found', async () => {
      const username = 'nonexistentuser';

      // Mock de la méthode findUnique de databaseService pour retourner null
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.getUserByUsername(username);

      // Vérification que la méthode findUnique a été appelée avec les bons paramètres
      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { username },
      });
      // Vérification que le résultat est null
      expect(result).toBeNull();
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const expectedUsers: User[] = [
        {
          id: 'user1',
          username: 'user1',
          password: 'hashedpassword1',
          creationDate: new Date(),
        },
        {
          id: 'user2',
          username: 'user2',
          password: 'hashedpassword2',
          creationDate: new Date(),
        },
      ];

      // Mock de la méthode findMany de databaseService
      jest
        .spyOn(databaseService.user, 'findMany')
        .mockResolvedValue(expectedUsers);

      const result = await service.getUsers();

      // Vérification que la méthode findMany a été appelée
      expect(databaseService.user.findMany).toHaveBeenCalled();
      // Vérification que le résultat est correct
      expect(result).toEqual(expectedUsers);
    });
  });
});
