import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DigitalAdController } from './digital-ad.controller';
import { DigitalAdService } from './digital-ad.service';
import { schema as DigitalAdSchema } from './digital-ad.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'DigitalAd', schema:DigitalAdSchema}
        ]),
        
    ],
    controllers:[DigitalAdController],
    providers:[
        DigitalAdService
    ]
})
export class DigitalAdModule {}
