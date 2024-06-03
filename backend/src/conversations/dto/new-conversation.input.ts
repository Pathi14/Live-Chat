import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@InputType()
export class NewConversationInput {
  @Field( type => [String])
  usersid: string[];

  
}