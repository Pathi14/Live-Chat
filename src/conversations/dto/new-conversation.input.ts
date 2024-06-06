import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewConversationInput {
  @Field((type) => [String])
  userIds: string[];
}
