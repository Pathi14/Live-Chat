import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { messages } from './messages.service';

@Processor('message')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  @Process('saveMessage')
  async handleSaveMessage(job: Job): Promise<void> {
    const message = job.data;
    this.logger.debug(`Saving message with id ${message.id}`);
    console.log(`Saving message: ${JSON.stringify(message)}`);

    messages.push(message);
    
    this.logger.debug(`Message with id ${message.id} saved successfully.`);
    console.log(`Message with id ${message.id} saved successfully.`);
  }
}
