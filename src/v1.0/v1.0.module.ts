import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { FinancesModule } from './finances/finances.module';

@Module({
    imports:[
        CoreModule,
        FinancesModule
    ],
    controllers:[],
    providers:[]
})
export class V_1_0_Module {}
