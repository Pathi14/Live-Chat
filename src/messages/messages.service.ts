import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from './models/message.model';
import { NewMessageInput } from './dto/new-message.input';
import { User } from '../users/models/user.model';
import { Conversation } from '../conversations/models/conversation.model';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async addMessage(data: NewMessageInput): Promise<Message> {
    const { content, senderId, receiverId, conversationId } = data;

    // Validate sender, receiver, and conversation existence
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });
    if (!sender) {
      throw new BadRequestException(`Sender with id ${senderId} not found`);
    }

    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
    });
    if (!receiver) {
      throw new BadRequestException(`Receiver with id ${receiverId} not found`);
    }

    const createdMessage = await this.prisma.message.create({
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
    const messages = await this.prisma.message.findMany({
      include: {
        sender: true,
        receiver: true,
        conversation: true,
      },
    });

    return messages;
  }
}
