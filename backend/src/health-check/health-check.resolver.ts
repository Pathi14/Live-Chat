import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthCheckResolver {
  @Query(() => String)
  healthCheck(): string{
    return "Ok";
  }
}
