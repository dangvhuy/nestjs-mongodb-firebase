import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FileUpload, FileUploadSchema} from './schemas/file-upload.schema';
import {FileUploadController} from './file-upload.controller';
import {FileUploadService} from './file-upload.service';
import {CommonModule} from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: FileUpload.name, schema: FileUploadSchema}]),
    CommonModule
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {

}