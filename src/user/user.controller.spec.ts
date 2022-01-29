import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';

describe('UserController', () => {
  let underTest: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            add: jest.fn()
          }
        }
      ]
    }).compile();

    underTest = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  it('test add should work correctly when called', async () => {
    const user = {name: 'Huy', age: 10, cityId: 1};
    jest.spyOn(userService, 'add').mockImplementation(() => Promise.resolve(null));
    underTest.add(user);
    expect(userService.add).toHaveBeenCalledWith(user);
  });
});
