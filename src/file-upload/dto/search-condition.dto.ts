import {IsNumberString, IsString} from 'class-validator';

export class SearchConditionDto {

  @IsNumberString()
  readonly limit: number;

  @IsNumberString()
  readonly offset: number;

  @IsString()
  readonly name: string;
}