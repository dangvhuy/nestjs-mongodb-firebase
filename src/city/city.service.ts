import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {City, CityDocument} from './city.schema';

@Injectable()
export class CityService {

  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {
  }

  async findBy(id: number): Promise<City> {
    return this.cityModel.findOne({_id: id}).exec();
  }

  async isValidCityId(id: number): Promise<boolean> {
    const count = await this.cityModel.count({_id: id}).exec();
    return count > 0;
  }
}
