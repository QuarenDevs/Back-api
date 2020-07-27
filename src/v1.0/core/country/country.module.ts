import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './country.mg-document';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { StateModule } from './nestedObjects/state/state.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Country', schema:schema}
        ]),
        StateModule
    ],
    controllers:[CountryController],
    providers:[CountryService]
})
export class CountryModule {}
