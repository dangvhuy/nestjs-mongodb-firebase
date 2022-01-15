import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CityDocument = City & Document;

@Schema({collection: 'cities'})
export class City {

  @Prop({type: Number, required: true})
  _id: number;

  @Prop({type: String, required: true})
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);