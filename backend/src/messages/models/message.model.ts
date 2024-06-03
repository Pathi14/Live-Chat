import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from 'src/conversations/models/conversation.model';
import { User } from 'src/users/models/user.model';

@ObjectType({ description: 'message ' })
export class Message {
  @Field((type) => ID)
  id: string;

  @Field()
  content: string;

  @Field((type) => User)
  sender: User;

  @Field((type) => User)
  receiver: User;

  @Field((type) => Conversation)
  conversation: Conversation;

  @Field()
  creationDate: Date;
}
