import { InjectQueue } from '@nestjs/bull';
import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { Queue } from 'bull';

@Resolver()
export class HealthCheckResolver {
  constructor(
    @InjectQueue('health') private readonly healthQueue: Queue,
  ) {}

  @Query(() => String)
  async health(): Promise<string> {
    return 'OK';
  }

  @Mutation(() => String)
  async addJobToQueue(): Promise<string> {
    await this.healthQueue.add('default', { data: 'sample job data' });
    return 'Health check and job added';
  }

  @Query(() => String)
  async testRedis(): Promise<string> {
    const client = await this.healthQueue.client;
    const pong = await client.ping();
    return pong;
  }

}
