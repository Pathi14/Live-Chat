import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NewMessageInput } from './dto/new-message.input';
import { MessagesService } from './messages.service';

@Processor('message')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(private readonly messagesService: MessagesService) {}

  @Process('saveMessage')
  async handleSaveMessage(job: Job<NewMessageInput>): Promise<void> {
    const messageData = job.data;
    this.logger.debug(`Saving message with content ${messageData.content}`);
    console.log(`Saving message: ${JSON.stringify(messageData)}`);

    try {
      const createdMessage = await this.messagesService.addMessage(messageData);
      this.logger.debug(
        `Message with id ${createdMessage.id} saved successfully.`,
      );
      console.log(`Message with id ${createdMessage.id} saved successfully.`);
    } catch (error) {
      this.logger.error(`Failed to save message: ${error.message}`);
      console.error(`Failed to save message: ${error.message}`);
      throw error;
    }
  }
}
