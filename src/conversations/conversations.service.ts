import { BadRequestException, Injectable } from '@nestjs/common';
import { NewConversationInput } from './dto/new-conversation.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Conversation } from './models/conversation.model';

export const conversations: Conversation[] = [];

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async createConversation(data: NewConversationInput): Promise<Conversation> {
    
    const users = await this.prisma.user.findMany({
      where: { id: { in: data.userIds } },
    });

    if (users.length !== data.userIds.length) {
      throw new BadRequestException(`One or more users not found`);
    }

    return this.prisma.conversation.create({
      data: {
        users: {
          connect: data.userIds.map((userId) => ({ id: userId })),
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            receiver: true,
          }
        },
      },
    });
  }

  async getConversations(userIds: string[]): Promise<Conversation[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    const foundUserIds = users.map(user => user.id);
    const notFoundUserIds = userIds.filter(id => !foundUserIds.includes(id));
    if (notFoundUserIds.length > 0) {
      throw new BadRequestException(`Users with ids ${notFoundUserIds.join(', ')} not found`);
    }

    const conversations = await this.prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: {
              in: userIds,
            },
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            receiver: true,
          },
        },
      },
    });

    return conversations;
  }
}
