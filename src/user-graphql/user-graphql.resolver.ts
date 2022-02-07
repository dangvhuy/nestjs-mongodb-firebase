import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from '../user/user.service';
import {UserInput} from './user.input';
import {UserDto} from '../user/user.dto';
import {UserModel} from './user.model';
import {ValidationPipe} from '@nestjs/common';

@Resolver(of => UserModel)
export class UserGraphqlResolver {

  constructor(private readonly userService: UserService) {
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(returns => UserModel)
  async addUser(@Args('user', new ValidationPipe({validateCustomDecorators: true})) user: UserInput): Promise<UserModel> {
    const createdUser = await this.userService.add(new UserDto(user.name, user.age, user.cityId));
    return new UserModel(createdUser._id, createdUser.name, createdUser.age, createdUser.city._id);
  }
}
