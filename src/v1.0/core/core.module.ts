import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { MeasurementUnitModule } from './measurement-unit/measurement-unit.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { UserModule } from './user/user.module';

@Module({
    imports:[
        CountryModule,
		MeasurementUnitModule,
		DocumentTypeModule,
		UserModule
    ],
    controllers:[],
    providers:[]
})
export class CoreModule {}
