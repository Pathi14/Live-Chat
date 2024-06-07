import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageQueueModule } from './message.queue.module';
import { MessageProcessor } from './message.processor';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [ 
    PrismaModule,
    MessageQueueModule,
    AuthModule,
  ],
  providers: [MessagesService, MessageProcessor],
  exports: [MessagesService],
})
export class MessagesModule {}
