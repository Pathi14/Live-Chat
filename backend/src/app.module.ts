import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { HealthCheckResolver } from './health-check/health-check.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, HealthCheckResolver],
})
export class AppModule {}
