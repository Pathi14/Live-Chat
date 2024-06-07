import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { NewConversationInput } from './dto/new-conversation.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Resolver(() => Conversation)
export class ConversationsResolver {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Mutation(() => Conversation)
  async addConversation(
    @Args('newConversationData') newConversationData: NewConversationInput,
  ): Promise<Conversation> {
    const conversation = await this.conversationsService.createConversation(newConversationData);
    return conversation;
  }

  @Query(() => [Conversation])
  async getConversations(
    @Args('userIds', { type: () => [String] }) userIds: string[],
  ): Promise<Conversation[]> {
    return this.conversationsService.getConversations(userIds);
  }
}
