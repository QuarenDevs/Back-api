import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoroughController } from './borough.controller';
import { CountryService } from '../../../../../../country.service';
import { schema as CountrySchema } from '../../../../../../country.mg-document';
import { StateService } from '../../../../state.service';
import { schema as StateSchema } from '../../../../state.mg-document';
import { CityService } from '../../city.service';
import { schema as CitySchema } from '../../city.mg-document';
import { BoroughService } from './borough.service';
import { schema as BoroughSchema } from './borough.mg-document';


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
            {name:'Borough', schema:BoroughSchema}
        ]),
        
    ],
    controllers:[BoroughController],
    providers:[
        CountryService,
		StateService,
		CityService,
		BoroughService
    ]
})
export class BoroughModule {}
