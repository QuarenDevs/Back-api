import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityController } from './city.controller';
import { CountryService } from '../../../../country.service';
import { schema as CountrySchema } from '../../../../country.mg-document';
import { StateService } from '../../state.service';
import { schema as StateSchema } from '../../state.mg-document';
import { CityService } from './city.service';
import { schema as CitySchema } from './city.mg-document';
import { BoroughModule } from './nestedObjects/borough/borough.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Country', schema:CountrySchema}
        ]),
		MongooseModule.forFeature([
            {name:'State', schema:StateSchema}
        ]),
		MongooseModule.forFeature([
            {name:'City', schema:CitySchema}
        ]),
        BoroughModule
    ],
    controllers:[CityController],
    providers:[
        CountryService,
		StateService,
		CityService
    ]
})
export class CityModule {}
