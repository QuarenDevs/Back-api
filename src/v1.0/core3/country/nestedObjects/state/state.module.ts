import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateController } from './state.controller';
import { CountryService } from '../../country.service';
import { schema as CountrySchema } from '../../country.mg-document';
import { StateService } from './state.service';
import { schema as StateSchema } from './state.mg-document';
import { CityModule } from './nestedObjects/city/city.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Country', schema:CountrySchema}
        ]),
		MongooseModule.forFeature([
            {name:'State', schema:StateSchema}
        ]),
        CityModule
    ],
    controllers:[StateController],
    providers:[
        CountryService,
		StateService
    ]
})
export class StateModule {}
