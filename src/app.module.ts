import {Module} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {FileUploadModule} from './file-upload/file-upload.module';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {CityModule} from './city/city.module';
import {HttpExceptionFilter} from './http-exception.filter';
import {GraphQLModule} from '@nestjs/graphql';
import { UserGraphqlModule } from './user-graphql/user-graphql.module';
import {GraphQLError, GraphQLFormattedError} from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.response?.message.join(', ') || error?.message,
        };
        return graphQLFormattedError;
      },

    }),
    FileUploadModule,
    AuthModule,
    UserModule,
    CityModule,
    UserGraphqlModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {
}
