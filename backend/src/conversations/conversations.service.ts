import { Injectable } from '@nestjs/common';
import { Conversation } from './models/conversation.model';
import { NewConversationInput } from './dto/new-conversation.input';
import { users } from 'src/users/users.service';

const conversations: Conversation[] = [];

@Injectable()
export class ConversationsService {
  async createConversation(data: NewConversationInput): Promise<Conversation> {
    const conversation: Conversation = {
      id: `conversation#${conversations.length + 1}`,
      users: users.filter((user) => data.userIds.includes(user.id)),
      messages: [],
    };

    conversations.push(conversation);

    return conversation;
  }

  async getConversations(): Promise<Conversation[]> {
    return conversations;
  }
}
