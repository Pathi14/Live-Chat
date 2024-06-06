import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/message.model';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Conversation {
  @Field( type => ID)
  id: string;

  @Field(type => [User])
  users: User[];

  @Field(type => [Message])
  messages: Message[];
}

