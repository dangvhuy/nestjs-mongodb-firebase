import {IsString, MaxLength, MinLength} from 'class-validator';

export class FileUploadDto {

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly name: string;
}