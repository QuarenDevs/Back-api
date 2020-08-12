import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { schema as CountrySchema } from './country.mg-document';
import { StateModule } from './nestedObjects/state/state.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Country', schema:CountrySchema}
        ]),
        StateModule
    ],
    controllers:[CountryController],
    providers:[
        CountryService
    ]
})
export class CountryModule {}
