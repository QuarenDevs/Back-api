import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module';
import { AdvertisingModule } from './advertising/advertising.module';


@Module({
    imports:[
        SalesModule,
		AdvertisingModule
        
    ],
    controllers:[],
    providers:[]
})
export class MarketingModule {}
