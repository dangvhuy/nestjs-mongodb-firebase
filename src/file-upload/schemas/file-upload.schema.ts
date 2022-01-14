import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileUploadDocument = FileUpload & Document;

@Schema()
export class FileUpload {

  @Prop()
  name: string;

  @Prop()
  url: string;
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);