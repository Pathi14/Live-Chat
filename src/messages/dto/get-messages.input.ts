import { Field, ID, InputType } from '@nestjs/graphql';
import { Conversation } from 'src/conversations/models/conversation.model';

@InputType()
export class GetMessagesInput {
  @Field((type) => ID)
  conversationId: Conversation['id'];
}
