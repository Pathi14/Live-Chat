import { BadRequestException, Injectable } from '@nestjs/common';
import { Conversation } from './models/conversation.model';
import { NewConversationInput } from './dto/new-conversation.input';
import { users } from '../users/users.service';
import { messages } from '../messages/messages.service';
import { User } from '../users/models/user.model';

export const conversations: Conversation[] = [];

@Injectable()
export class ConversationsService {
  async createConversation(data: NewConversationInput): Promise<Conversation> {
    for (const userId of data.userIds) {
      const user = users.find((user) => user.id === userId);

      if (!user) {
        throw new BadRequestException(`User with id ${userId} not found`);
      }
    }

    const conversation: Conversation = {
      id: `conversation#${conversations.length + 1}`,
      users: users.filter((user) => data.userIds.includes(user.id)),
      messages: [],
    };

    conversations.push(conversation);

    return conversation;
  }

  async getConversations(userId: User['id']): Promise<Conversation[]> {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }

    return conversations
      .filter((conversation) => conversation.users.includes(user))
      .map((conversation) => {
        return {
          ...conversation,
          messages: messages.filter(
            (message) => message.conversation.id === conversation.id,
          ),
        };
      });
  }
}
