import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FileUpload, FileUploadSchema} from './schemas/file-upload.schema';
import {FileUploadController} from './file-upload.controller';
import {FileUploadService} from './file-upload.service';

@Module({
  imports: [MongooseModule.forFeature([{name: FileUpload.name, schema: FileUploadSchema}])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {

}