import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from './models/message.model';
import { MessagesService } from './messages.service';
import { NewMessageInput } from './dto/new-message.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @InjectQueue('message') private readonly messageQueue: Queue,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async addMessage(
    @Args('newMessageData') newMessageData: NewMessageInput,
  ): Promise<boolean> {
    await this.messageQueue.add('saveMessage', newMessageData);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async getMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }
}
