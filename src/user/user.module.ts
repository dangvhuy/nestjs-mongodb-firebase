import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {CityModule} from '../city/city.module';
import {UserController} from './user.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './user.schema';

@Module({
  imports: [
    CityModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
}
