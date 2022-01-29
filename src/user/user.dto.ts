import {IsInt, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

export class UserDto {

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(150)
  readonly age: number;

  @IsInt()
  readonly cityId: number;
}
