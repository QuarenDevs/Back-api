import { Module } from '@nestjs/common';
import { Core3Module } from './core3/core3.module';
import { FinancesModule } from './finances/finances.module';
import { LogisticsModule } from './logistics/logistics.module';
import { MarketingModule } from './marketing/marketing.module';
import { CoreModule } from './core/core.module';

@Module({
    imports:[
        CoreModule,
        FinancesModule,
        LogisticsModule,
        MarketingModule
    ],
    controllers:[],
    providers:[]
})
export class V_1_0_Module {}
