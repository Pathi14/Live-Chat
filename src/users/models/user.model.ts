import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  creationDate: Date;
}
