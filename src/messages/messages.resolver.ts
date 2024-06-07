import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from './models/message.model';
import { MessagesService } from './messages.service';
import { NewMessageInput } from './dto/new-message.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @InjectQueue('message') private readonly messageQueue: Queue,
  ) {}

  @Mutation(() => Boolean)
  async addMessage(
    @Args('newMessageData') newMessageData: NewMessageInput,
  ): Promise<boolean> {
    await this.messageQueue.add('saveMessage', newMessageData);
    return true;
  }

  @Query(() => [Message])
  async getMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }
}
