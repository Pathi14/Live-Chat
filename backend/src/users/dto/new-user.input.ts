import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(10)
  @IsAlphanumeric()
  username: string;

  @Field()
  @Length(8, 20)
  password: string;
}
