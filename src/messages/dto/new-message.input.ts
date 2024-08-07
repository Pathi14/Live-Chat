import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Conversation } from 'src/conversations/models/conversation.model';
import { User } from 'src/users/models/user.model';

@InputType()
export class NewMessageInput {
  @Field((type) => ID)
  conversationId: Conversation['id'];

  @Field()
  @Length(1, 10000)
  content: string;
}
