import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './borough.mg-document';
import { BoroughService } from './borough.service';
import { BoroughController } from './borough.controller';
import { CityService } from '../../city.service';
import { StateService } from '../../../../state.service';
import { CountryService } from 'src/v1.0/core/country/country.service';

import { schema as CountrySchema } from 'src/v1.0/core/country/country.mg-document';
import { schema as StateSchema } from '../../../../state.mg-document';
import { schema as CitySchema} from '../../city.mg-document';

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
        MongooseModule.forFeature([
            {name:'Borough', schema:schema}
        ]),
        
    ],
    controllers:[BoroughController],
    providers:[
        CountryService,
        StateService,
        CityService,
        BoroughService]
})
export class BoroughModule {}
