import { Module } from '@nestjs/common';
import { HealthCheckProcessor } from './health-check.processor';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckResolver } from './health-check.resolver';
import { QueueModule } from './queue.module';

@Module({
    imports: [ QueueModule ],
    controllers: [HealthCheckController],
    exports: [HealthCheckProcessor, HealthCheckResolver],
    providers: [HealthCheckProcessor, HealthCheckResolver],
})
export class HealthCheckModule {}
