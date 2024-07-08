import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsService } from './conversations.service';
import { BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

describe('ConversationsService', () => {
  let service: ConversationsService;
  let databaseService: DatabaseService;

  // Configuration du module de test avant chaque test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findMany: jest.fn(),
            },
            conversation: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ConversationsService>(ConversationsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should throw BadRequestException if any user ID is not found', async () => {
    const userIds = ['user1', 'user2'];
    // Mock pour simuler que l'utilisateur avec l'ID 'user2' n'est pas trouvé
    jest.spyOn(databaseService.user, 'findMany').mockResolvedValue([
      { id: 'user1', username: 'UserOne', password: 'password1', creationDate: new Date() },
    ]);

    // Vérification que l'exception BadRequestException est lancée
    await expect(service.getConversations(userIds)).rejects.toThrow(
      new BadRequestException('Users with ids user2 not found'),
    );
  });

  it('should return conversations if all user IDs are found', async () => {
    const userIds = ['user1', 'user2'];
    const mockUsers = [
      { id: 'user1', username: 'UserOne', password: 'password1', creationDate: new Date() },
      { id: 'user2', username: 'UserTwo', password: 'password2', creationDate: new Date() },
    ];
    const mockConversations = [
      {
        id: 'conversation1',
        users: mockUsers,
        messages: [],
      },
    ];

    // Mock pour simuler que tous les utilisateurs sont trouvés
    jest.spyOn(databaseService.user, 'findMany').mockResolvedValue(mockUsers);
    // Mock pour simuler que les conversations sont trouvées
    jest.spyOn(databaseService.conversation, 'findMany').mockResolvedValue(mockConversations);

    const result = await service.getConversations(userIds);
    // Vérification que les conversations retournées sont correctes
    expect(result).toEqual(mockConversations);
  });
});