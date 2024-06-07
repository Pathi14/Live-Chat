// conversations.module.ts
import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsResolver } from './conversations.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [ConversationsService, ConversationsResolver],
  exports: [ConversationsService],
})
export class ConversationsModule {}
