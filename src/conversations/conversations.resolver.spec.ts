import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsResolver } from './conversations.resolver';
import { ConversationsService } from './conversations.service';
import { Conversation } from './models/conversation.model';
import { NewConversationInput } from './dto/new-conversation.input';

describe('ConversationsResolver', () => {
  let resolver: ConversationsResolver;
  let service: ConversationsService;

  beforeEach(async () => {
    service = { createConversation: jest.fn(), getConversations: jest.fn() } as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsResolver,
        { provide: ConversationsService, useValue: service },
      ],
    }).compile();

    resolver = module.get<ConversationsResolver>(ConversationsResolver);
  });

  it('should call createConversation on service with correct value', async () => {
    const newConversationData: NewConversationInput = { userIds: ['1'] };
    await resolver.addConversation(newConversationData);
    expect(service.createConversation).toHaveBeenCalledWith(newConversationData);
  });

  it('should call getConversations on service with correct value', async () => {
    const userId = '1';
    await resolver.getConversations(userId);
    expect(service.getConversations).toHaveBeenCalledWith(userId);
  });
});