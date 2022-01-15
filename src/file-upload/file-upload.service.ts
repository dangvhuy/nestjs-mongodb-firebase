import {Injectable, Logger} from '@nestjs/common';
import {S3} from 'aws-sdk';
import {StringService} from '../common/string.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {FileUpload, FileUploadDocument} from './schemas/file-upload.schema';
import {SearchConditionDto} from './dto/search-condition.dto';

@Injectable()
export class FileUploadService {

  constructor(private stringService: StringService,
              @InjectModel(FileUpload.name) private fileUploadModel: Model<FileUploadDocument>) {
  }

  private readonly s3BucketName = process.env.AWS_S3_BUCKET;
  private readonly s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async upload(file) {
    const {originalname, mimetype} = file;
    const name = this.generateFileName(originalname);
    const response = await this.uploadS3(file.buffer, name, mimetype);
    const url = response['Location'];
    const result = await new this.fileUploadModel(new FileUpload(name, url)).save();
    return result;
  }

  async uploadS3(file, name, contentType) {
    const params = {
      Bucket: this.s3BucketName,
      Key: name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }

  generateFileName(originalName) {
    return `${this.stringService.generateUniqueKey()}__${originalName}`;
  }

  findBy(searchCondition: SearchConditionDto) {
    const filter = searchCondition.name ? {name: searchCondition.name} : {};
    const projection = {name: 1, _id: 0};
    const queryOptions = {limit: searchCondition.limit, skip: searchCondition.offset};
    return this.fileUploadModel.find(filter, projection, queryOptions).exec();
  }
}
