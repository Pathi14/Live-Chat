import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageQueueModule } from './message.queue.module';
import { MessageProcessor } from './message.processor';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, MessageQueueModule, AuthModule],
  providers: [MessagesService, MessageProcessor],
  exports: [MessagesService],
})
export class MessagesModule {}
