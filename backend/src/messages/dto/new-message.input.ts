import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, Length, MaxLength } from 'class-validator';


@InputType()
export class NewMessageInput {
  @Field()
  @MaxLength(10000)
  @IsAlphanumeric()
  msg: string;

}