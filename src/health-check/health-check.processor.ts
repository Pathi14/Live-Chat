import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('health')
export class HealthCheckProcessor {
    private readonly logger = new Logger(HealthCheckProcessor.name);

    @Process('default')
    async handleJob(job: Job): Promise<any> {
        this.logger.debug(`Processing job with id ${job.id} and data ${JSON.stringify(job.data)}`);
        console.log(`Processing job: ${job.id} with data: ${JSON.stringify(job.data)}`);
    
        // Mock processing time (you can replace this with actual logic)
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        // Mock processing result (you can replace this with actual logic)
        const result = { status: 'OK' };
    
        this.logger.debug(`Job with id ${job.id} processed successfully.`);
        console.log(`Job with id ${job.id} processed successfully.`);
    
        return result;
      }
}