import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { conversations } from '../conversations/conversations.service';
import { NewMessageInput } from './dto/new-message.input';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should throw an error if conversation not found', async () => {
    const newMessageInput: NewMessageInput = {
      content: 'Test message',
      conversationId: 'nonexistentId',
      senderId: 'senderId', // Add the missing senderId property
      receiverId: 'receiverId', // Add the missing receiverId property
    };

    await expect(service.addMessage(newMessageInput)).rejects.toThrow('Conversation not found');
  });
});