import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NewMessageInput } from './dto/new-message.input';
import { MessagesService } from './messages.service';
import { User } from 'src/users/models/user.model';
import { WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Processor('message')
@WebSocketGateway({ port: 3000 })
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);
  server: Server;

  constructor(private readonly messagesService: MessagesService) {
    this.server = new Server({ cors: { origin: '*' } });
  }

  @Process('saveMessage')
  async handleSaveMessage(
    job: Job<{ data: NewMessageInput; senderId: User['id'] }>,
  ): Promise<void> {
    const messageData = job.data;
    this.logger.debug(`Saving message with content ${messageData.data}`);
    console.log(`Saving message: ${JSON.stringify(messageData.data)}`);

    try {
      const createdMessage = await this.messagesService.addMessage(
        messageData.data,
        messageData.senderId,
      );
      this.logger.debug(
        `Message with id ${createdMessage.id} saved successfully.`,
      );
      console.log(`Message with id ${createdMessage.id} saved successfully.`);

      this.server.emit(messageData.data.conversationId, job.data);
    } catch (error) {
      this.logger.error(`Failed to save message: ${error.message}`);
      console.error(`Failed to save message: ${error.message}`);
      throw error;
    }
  }
}
