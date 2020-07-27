import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './city.mg-document';
import { CityService } from './city.service';
import { CityController } from './city.controller';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'City', schema:schema}
        ]),
        
    ],
    controllers:[CityController],
    providers:[CityService]
})
export class CityModule {}
