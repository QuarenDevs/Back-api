import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { MeasurementUnitModule } from './measurement-unit/measurement-unit.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { UserModule } from './user/user.module';
import { ParametricsModule } from './parametrics/parametrics.module';
import { CompanyInfoModule } from './company-info/company-info.module';

@Module({
    imports:[
        // Subareas
        ParametricsModule,
        CompanyInfoModule,
        // Models
        CountryModule,
		MeasurementUnitModule,
		DocumentTypeModule,
		UserModule,
    ],
    controllers:[],
    providers:[]
})
export class CoreModule {}
