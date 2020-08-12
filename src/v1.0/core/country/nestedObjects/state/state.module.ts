import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema as stateSchema } from './state.mg-document';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { CityModule } from './nestedObjects/city/city.module';
import { CountryService } from '../../country.service';
import { schema as countrySchema } from '../../country.mg-document';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Country', schema:countrySchema}
        ]),
        MongooseModule.forFeature([
            {name:'State', schema:stateSchema}
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
