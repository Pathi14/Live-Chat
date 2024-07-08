import { BadRequestException, Injectable } from '@nestjs/common';
import { NewConversationInput } from './dto/new-conversation.input';
import { Conversation } from './models/conversation.model';
import { DatabaseService } from '../database/database.service';
import { User } from '../users/models/user.model';

export const conversations: Conversation[] = [];

@Injectable()
export class ConversationsService {
  constructor(private databaseService: DatabaseService) {}

  async createConversation(
    currentUserId: User['id'],
    interlocutorId: User['id'],
  ): Promise<Conversation> {
    const interlocutor = await this.databaseService.user.findUnique({
      where: { id: interlocutorId },
    });

    if (!interlocutor) {
      throw new BadRequestException(`User with id ${interlocutorId} Not found`);
    }

    console.log(interlocutorId);
    console.log(currentUserId);

    return this.databaseService.conversation.create({
      data: {
        users: {
          connect: [{ id: interlocutorId }, { id: currentUserId }],
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
  }

  async getConversations(userIds: string[]): Promise<Conversation[]> {
    const users = await this.databaseService.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    const foundUserIds = users.map((user) => user.id);
    const notFoundUserIds = userIds.filter((id) => !foundUserIds.includes(id));
    if (notFoundUserIds.length > 0) {
      throw new BadRequestException(
        `Users with ids ${notFoundUserIds.join(', ')} not found`,
      );
    }

    const conversations = await this.databaseService.conversation.findMany({
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
