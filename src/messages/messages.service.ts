import { BadRequestException, Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { NewMessageInput } from './dto/new-message.input';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addMessage(data: NewMessageInput): Promise<Message> {
    const { content, senderId, receiverId, conversationId } = data;

    // Validate sender, receiver, and conversation existence
    const conversation = await this.databaseService.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    const sender = await this.databaseService.user.findUnique({
      where: { id: senderId },
    });
    if (!sender) {
      throw new BadRequestException(`Sender with id ${senderId} not found`);
    }

    const receiver = await this.databaseService.user.findUnique({
      where: { id: receiverId },
    });
    if (!receiver) {
      throw new BadRequestException(`Receiver with id ${receiverId} not found`);
    }

    const createdMessage = await this.databaseService.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
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

  async getMessages(): Promise<Message[]> {
    const messages = await this.databaseService.message.findMany({
      include: {
        sender: true,
        receiver: true,
        conversation: true,
      },
    });

    return messages;
  }
}
