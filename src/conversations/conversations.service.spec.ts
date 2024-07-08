import { ConversationsService } from './conversations.service';
import { NewConversationInput } from './dto/new-conversation.input';
import { users } from '../users/users.service';
import { messages } from '../messages/messages.service';
import { User } from 'src/users/models/user.model';
import { UsersService } from '../users/users.service';

describe('ConversationsService', () => {
  let service: ConversationsService;
  let usersService: UsersService;

  beforeEach(() => {
    service = new ConversationsService();
    usersService = new UsersService(); // initialize your UsersService

    // Create the users needed for the tests
    usersService.addUser({ username: 'Test User 1', password: 'password&123' });
    usersService.addUser({ username: 'Test User 2', password: 'password' });
  });

  it('should create a new conversation', async () => {
    const newConversation: NewConversationInput = {
      userIds: ['user#1', 'user#2'],
    };

    const conversation = await service.createConversation(newConversation);

    expect(conversation).toHaveProperty('id');
    expect(conversation.users).toHaveLength(2);
    expect(conversation.messages).toHaveLength(0);
  });

  it('should throw an error if user not found when creating a conversation', async () => {
    const newConversation: NewConversationInput = {
      userIds: ['user#1', 'nonexistentUser'],
    };

    await expect(service.createConversation(newConversation)).rejects.toThrow();
  });

  it('should get conversations for a user', async () => {
    const userId = 'user#1';
    const conversations = await service.getConversations(userId);

    expect(conversations).toBeInstanceOf(Array);
    conversations.forEach((conversation) => {
      expect(conversation.users).toContainEqual(
        expect.objectContaining({ id: userId }),
      );
    });
  });

  it('should throw an error if user not found when getting conversations', async () => {
    const userId = 'nonexistentUser';

    await expect(service.getConversations(userId)).rejects.toThrow();
  });
});
