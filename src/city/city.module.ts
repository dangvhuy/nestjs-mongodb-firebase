import {Module} from '@nestjs/common';
import {CityService} from './city.service';
import {City, CitySchema} from './city.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: City.name, schema: CitySchema}])],
  providers: [
    CityService
  ],
  exports: [CityService]
})
export class CityModule {
}
