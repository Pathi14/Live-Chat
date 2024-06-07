import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class NewConversationInput {
  @Field((type) => ID)
  interlocutorId: string;
}
