import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {FileUploadModule} from './file-upload/file-upload.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:DdEWMhxeE7GNrrEU@cluster0-shard-00-00.ofyy6.mongodb.net:27017,cluster0-shard-00-01.ofyy6.mongodb.net:27017,cluster0-shard-00-02.ofyy6.mongodb.net:27017/nestjs?ssl=true&replicaSet=atlas-er5zs8-shard-0&authSource=admin'),
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
