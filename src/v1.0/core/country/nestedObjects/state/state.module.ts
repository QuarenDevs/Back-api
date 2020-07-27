import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './state.mg-document';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { CityModule } from './nestedObjects/city/city.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'State', schema:schema}
        ]),
        CityModule
    ],
    controllers:[StateController],
    providers:[StateService]
})
export class StateModule {}
