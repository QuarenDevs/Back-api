import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PresentationController } from './presentation.controller';
import { PresentationService } from './presentation.service';
import { schema as PresentationSchema } from './presentation.mg-document';
import { schema as ProductSchema } from '../product/product.mg-document';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Product', schema:ProductSchema}
        ]),
        MongooseModule.forFeature([
            {name:'Presentation', schema:PresentationSchema}
        ]),
        
    ],
    controllers:[PresentationController],
    providers:[
        PresentationService
    ]
})
export class PresentationModule {}
