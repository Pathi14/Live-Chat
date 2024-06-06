import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageQueueModule } from './message.queue.module';
import { MessageProcessor } from './message.processor';


@Module({
  imports: [ MessageQueueModule ],
  providers: [MessagesService, MessageProcessor],
  exports: [MessagesService],
})
export class MessagesModule {}
