import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { NewConversationInput } from './dto/new-conversation.input';
import { ConversationsService } from './conversations.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/models/user.model';

@Resolver(() => Conversation)
export class ConversationsResolver {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Conversation)
  async addConversation(
    @Args('newConversationData') newConversationData: NewConversationInput,
    @CurrentUser() user: User,
  ): Promise<Conversation> {
    console.log(`user: ${JSON.stringify(user)}`);
    const conversation = await this.conversationsService.createConversation(
      user.id,
      newConversationData.interlocutorId,
    );
    return conversation;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async getConversations(@CurrentUser() user: User): Promise<Conversation[]> {
    return this.conversationsService.getConversations([user.id]);
  }
}
