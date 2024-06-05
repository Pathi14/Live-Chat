import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message',
    }),
  ],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
