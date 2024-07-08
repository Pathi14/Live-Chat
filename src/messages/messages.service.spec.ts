import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '@nestjs/common';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './models/message.model';
import { User } from '../users/models/user.model';
import { Conversation } from '../conversations/models/conversation.model';

describe('MessagesService', () => {
  let service: MessagesService;
  let databaseService: DatabaseService;
  
  // Configuration du module de test avant chaque test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
            message: {
              create: jest.fn(),
            },
            conversation: {
              findUnique: jest.fn().mockResolvedValue({ id: 'valid-conversation-id' }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('addMessage', () => {
    it('should throw BadRequestException if receiver is not found', async () => {
      const newMessageInput: NewMessageInput = {
        senderId: 'sender-id',
        receiverId: 'receiver-id',
        conversationId: 'conversation-id',
        content: 'Hello',
      };

      // Mock pour simuler que le récepteur n'est pas trouvé
      (databaseService.user.findUnique as jest.Mock).mockResolvedValue(null);

      // Vérification que l'exception BadRequestException est lancée
      await expect(service.addMessage(newMessageInput)).rejects.toThrow(BadRequestException);
    });

    it('should create a message successfully', async () => {
      const newMessageInput: NewMessageInput = {
        senderId: 'sender-id',
        receiverId: 'receiver-id',
        conversationId: 'conversation-id',
        content: 'Hello',
      };

      const receiver: User = {
        id: newMessageInput.receiverId,
        username: 'receiver_username',
        creationDate: new Date(),
      };

      const createdMessage: Message = {
        id: 'message-id',
        content: newMessageInput.content,
        sender: { id: newMessageInput.senderId, username: 'sender_username', creationDate: new Date() },
        receiver: receiver,
        conversationId: newMessageInput.conversationId,
        creationDate: new Date(),
      };

      // Mock pour simuler que le récepteur est trouvé
      (databaseService.user.findUnique as jest.Mock).mockResolvedValue(receiver);
      // Mock pour simuler la création du message
      (databaseService.message.create as jest.Mock).mockResolvedValue(createdMessage);

      const result = await service.addMessage(newMessageInput);

      // Vérification que le message créé est correct
      expect(result).toEqual(createdMessage);
    });
  });
});