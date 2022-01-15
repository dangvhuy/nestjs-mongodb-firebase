import {Controller, Get, Post, Query, UploadedFile, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {FileUploadService} from './file-upload.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {SearchConditionDto} from './dto/search-condition.dto';

@Controller('upload')
export class FileUploadController {

  constructor(private readonly fileUploadService: FileUploadService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.fileUploadService.upload(file);
    return url;
  }

  @Get()
  async findBy(@Query(new ValidationPipe({validateCustomDecorators: true})) searchCondition: SearchConditionDto) {
    const result = await this.fileUploadService.findBy(searchCondition);
    return result;
  }
}
