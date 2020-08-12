import { Module } from '@nestjs/common';

import { DigitalAdModule } from './digital-ad/digital-ad.module';

@Module({
    imports:[
        
        DigitalAdModule
    ],
    controllers:[],
    providers:[]
})
export class AdvertisingModule {}
