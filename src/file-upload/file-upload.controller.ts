import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {FileUploadService} from './file-upload.service';
import {FileUploadDto} from './dto/file-upload.dto';

@Controller('fileUploads')
export class FileUploadController {

  constructor(private readonly fileUploadService: FileUploadService) {
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  upload(@Body() fileUploadDto: FileUploadDto) {
    return 'OK';
  }
}
