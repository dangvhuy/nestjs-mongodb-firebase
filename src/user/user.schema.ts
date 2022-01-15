import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {City} from '../city/city.schema';

export type UserDocument = User & Document;

@Schema({collection: 'users'})
export class User {

  @Prop({type: String, required: true})
  name: string;

  @Prop({type: Number, required: true})
  age: Number;

  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: 'City'})
  city: City;

  constructor(name: string, age: number, city: City) {
    this.name = name;
    this.age = age;
    this.city = city;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);