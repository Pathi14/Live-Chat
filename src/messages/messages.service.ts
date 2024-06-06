import { BadRequestException, Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { NewMessageInput } from './dto/new-message.input';
import { users } from 'src/users/users.service';
import { conversations } from 'src/conversations/conversations.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export const messages: Message[] = [];

@Injectable()
export class MessagesService {
  constructor(
    @InjectQueue('message') private readonly messageQueue: Queue,
  ) {}

  async addMessage(data: NewMessageInput): Promise<Message> {
    const conversation = conversations.find(
      (conversation) => conversation.id === data.conversationId,
    );

    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    const message: Message = {
      content: data.content,
      id: `message#${messages.length + 1}`,
      receiver: users.find((user) => user.id === data.receiverId),
      sender: users.find((user) => user.id === data.senderId),
      creationDate: new Date(),
      conversation: {
        ...conversation,
        messages: messages.filter(
          (message) => message.conversation.id === conversation.id,
        ),
      },
    };

    await this.messageQueue.add('saveMessage', message);

    return message;
  }

  async getMessages(): Promise<Message[]> {
    return messages;
  }
}