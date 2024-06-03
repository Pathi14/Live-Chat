import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { HealthCheckResolver } from './health-check/health-check.resolver';
import { UsersResolver } from './users/users.resolver';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'schema.gql',
    }),
    UsersModule,
    MessagesModule,
    ConversationsModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, HealthCheckResolver, UsersResolver],
})
export class AppModule {}
