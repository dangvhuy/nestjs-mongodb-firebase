import {Test, TestingModule} from '@nestjs/testing';
import {CityService} from './city.service';
import {getModelToken} from '@nestjs/mongoose';
import {City} from './city.schema';
import {Model} from 'mongoose';

const mockCity = {
  name: 'Ho Chi Minh',
  _id: 100
};

describe('CityService', () => {
  let service: CityService;
  let model: Model<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getModelToken(City.name),
          useValue: {
            findOne: jest.fn(),
            count: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    model = module.get<Model<City>>(getModelToken(City.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test findBy should return correct value when called', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCity),
    } as any);
    const id = 123;
    const city = await service.findBy(id);
    expect(city).toBe(mockCity);
  });
});
