import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from './models/message.model';
import { MessagesService } from './messages.service';
import { NewMessageInput } from './dto/new-message.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';
import { GetMessagesInput } from './dto/get-messages.input';

@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @InjectQueue('message') private readonly messageQueue: Queue,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async addMessage(
    @CurrentUser() currentUser: User,
    @Args('newMessageData') newMessageData: NewMessageInput,
  ): Promise<boolean> {
    await this.messageQueue.add('saveMessage', {
      data: newMessageData,
      senderId: currentUser.id,
    });
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async getMessages(
    @Args('getMessagesInput') getMessagesInput: GetMessagesInput,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(getMessagesInput);
  }
}
