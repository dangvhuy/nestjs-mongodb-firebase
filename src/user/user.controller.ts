import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Post()
  @UsePipes(new ValidationPipe({validateCustomDecorators: true}))
  async add(@Body() user: UserDto) {
    await this.userService.add(user);
  }
}
