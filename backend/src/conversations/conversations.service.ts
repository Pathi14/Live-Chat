import { BadRequestException, Injectable } from '@nestjs/common';
import { Conversation } from './models/conversation.model';
import { NewConversationInput } from './dto/new-conversation.input';
import { users } from 'src/users/users.service';
import { messages } from 'src/messages/messages.service';

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

  async getConversations(): Promise<Conversation[]> {
    return conversations.map((conversation) => {
      return {
        ...conversation,
        messages: messages.filter(
          (message) => message.conversation.id === conversation.id,
        ),
      };
    });
  }
}
