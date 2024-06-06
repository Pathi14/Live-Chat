import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from './models/message.model';
import { MessagesService } from './messages.service';
import { NewMessageInput } from './dto/new-message.input';

@Resolver()
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  async addMessage(
    @Args('newMessageData') newMessageData: NewMessageInput,
  ): Promise<Message> {
    return this.messagesService.addMessage(newMessageData);
  }

  @Query(() => [Message])
  async getMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }
}
