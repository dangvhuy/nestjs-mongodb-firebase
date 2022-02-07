import {Module} from '@nestjs/common';
import {UserGraphqlResolver} from './user-graphql.resolver';
import {UserService} from '../user/user.service';
import {User, UserSchema} from '../user/user.schema';
import {MongooseModule} from '@nestjs/mongoose';
import {CityModule} from '../city/city.module';

@Module({
  imports: [
    CityModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  providers: [UserGraphqlResolver, UserService]
})
export class UserGraphqlModule {
}
