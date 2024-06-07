import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  access_token: string;
}
