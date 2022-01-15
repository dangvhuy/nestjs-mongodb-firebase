import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from './user.schema';
import {UserDto} from './user.dto';
import {CityService} from '../city/city.service';
import {BusinessException} from '../common/business.exception';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private cityService: CityService) {
  }

  async add(user: UserDto) {
    const city = await this.cityService.findBy(user.cityId);
    if (!city) {
      throw new BusinessException('Invalid cityId');
    }
    await new this.userModel(new User(user.name, user.age, city)).save();
  }
}
