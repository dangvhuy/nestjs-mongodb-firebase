import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileUploadDocument = FileUpload & Document;

@Schema({collection: 'fileUploads'})
export class FileUpload {

  @Prop()
  name: string;

  @Prop()
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);