import {IsInt, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UserInput {

  @Field({nullable: false})
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly name: string;

  @Field()
  @IsInt()
  @Min(0)
  @Max(150)
  readonly age: number;

  @Field({nullable: false})
  @IsInt()
  readonly cityId: number;
}
