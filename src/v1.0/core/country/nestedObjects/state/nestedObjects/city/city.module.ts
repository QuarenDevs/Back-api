import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { StateService } from '../../state.service';
import { CountryService } from 'src/v1.0/core/country/country.service';
import { schema as CountrySchema } from 'src/v1.0/core/country/country.mg-document';
import { schema as StateSchema } from '../../state.mg-document';
import { schema as CitySchema} from './city.mg-document';
import { Borough } from './nestedObjects/borough/borough.mg-document';
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
