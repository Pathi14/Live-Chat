import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { User } from 'src/users/models/user.model';

@InputType()
export class NewMessageInput {
  @Field((type) => ID)
  senderId: User['id'];

  @Field((type) => ID)
  receiverId: User['id'];

  @Field()
  @Length(1, 10000)
  content: string;
}
