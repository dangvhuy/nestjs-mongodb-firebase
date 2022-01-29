import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {CityService} from '../city/city.service';
import {getModelToken} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './user.schema';

const mockCity = {
  _id: 10,
  name: 'Ho Chi Minh'
};

describe('UserService', () => {
  let underTest: UserService;
  let cityService: CityService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CityService,
          useValue: {
            findBy: jest.fn()
          }
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn()
          }
        }
      ],
    }).compile();

    underTest = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  const mockImplementationForFindByMethodOfCityService = () => {
    jest.spyOn(cityService, 'findBy').mockImplementation((cityId: number) => {
      return Promise.resolve(cityId === mockCity._id ? mockCity : null);
    });
  };

  it('test add should throw error when city is not existing', async () => {
    mockImplementationForFindByMethodOfCityService();
    try {
      await underTest.add({name: 'test', age: 10, cityId: 1});
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Invalid cityId');
    }
  });

  it('test add should work correctly when city is existing', async () => {
    mockImplementationForFindByMethodOfCityService();
    const expected = {name: 'test', age: 10, cityId: 10};
    jest.spyOn(userModel, 'create').mockImplementation(() => Promise.resolve(expected));
    const actual = await underTest.add({name: 'test', age: 10, cityId: 10});
    expect(actual).toBe(expected);
  });
});
