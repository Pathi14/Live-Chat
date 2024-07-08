import { BadRequestException, Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { NewMessageInput } from './dto/new-message.input';
import { DatabaseService } from '../database/database.service';
import { User } from 'src/users/models/user.model';
import { GetMessagesInput } from './dto/get-messages.input';

@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addMessage(
    data: NewMessageInput,
    senderId: User['id'],
  ): Promise<Message> {
    const { content, conversationId } = data;

    // Validate conversation existence
    const conversation = await this.databaseService.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: true,
      },
    });
    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    const createdMessage = await this.databaseService.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        receiver: {
          connect: {
            id: conversation.users.find((user) => user.id !== senderId).id,
          },
        },
        conversation: { connect: { id: conversationId } },
      },
      include: {
        sender: true,
        receiver: true,
        conversation: true,
      },
    });

    return createdMessage;
  }

  async getMessages(getMessagesInput: GetMessagesInput): Promise<Message[]> {
    const { conversationId } = getMessagesInput;

    const messages = await this.databaseService.message.findMany({
      where: { conversation: { id: conversationId } },
      include: {
        sender: true,
        receiver: true,
        conversation: true,
      },
    });

    return messages;
  }
}
