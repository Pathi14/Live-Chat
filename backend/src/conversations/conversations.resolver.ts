// conversations/conversations.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { ConversationsService } from './conversations.service';
import { NewConversationInput } from './dto/new-conversation.input';
import { Message } from 'src/messages/models/message.model';

@Resolver(() => Conversation)
export class ConversationsResolver {
  constructor(private readonly conversationsService: ConversationsService) {}
  @Mutation(() => Conversation)
  async addConversation(@Args('newConversationData') newConversationData: NewConversationInput): Promise<Conversation> {
    const { usersid } = newConversationData;
    return this.conversationsService.createConversation(newConversationData);
  }

  @Query(() => [Conversation])
  async getConversations(): Promise<Conversation[]> {
    return this.conversationsService.getConversations();
  }
}