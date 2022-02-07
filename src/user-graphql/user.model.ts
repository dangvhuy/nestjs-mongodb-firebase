import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType({description: 'user'})
export class UserModel {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({nullable: true})
  age: number;

  @Field()
  cityId: number;

  constructor(id: string, name: string, age: number, cityId: number) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.cityId = cityId;
  }
}
