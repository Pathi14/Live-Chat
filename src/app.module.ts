import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckResolver } from './health-check/health-check.resolver';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';
import { UsersResolver } from './users/users.resolver';
import { MessagesResolver } from './messages/messages.resolver';
import { ConversationsResolver } from './conversations/conversations.resolver';
import { HealthCheckModule } from './health-check/health-check.module';
import { QueueModule } from './health-check/queue.module';
import { MessageQueueModule } from './messages/message.queue.module';
import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/auth.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'schema.gql',
    }),
    QueueModule,
    MessageQueueModule,
    UsersModule,
    MessagesModule,
    ConversationsModule,
    HealthCheckModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersResolver,
    HealthCheckResolver,
    MessagesResolver,
    ConversationsResolver,
    AuthResolver,
  ],
})
export class AppModule {}
