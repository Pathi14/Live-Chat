import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    @InjectQueue('health') private readonly healthQueue: Queue,
  ) {}

  @Get('/')
  health(): string {
    return 'OK';
  }

  @Get('addqueue')
  async check() {
    await this.healthQueue.add('default', { data: 'sample job data' });
    return { message: 'Health check and job added' };
  }

  @Get('test-redis')
  async testRedis() {
    const client = await this.healthQueue.client;
    const pong = await client.ping();
    return { message: pong };
  }
}
