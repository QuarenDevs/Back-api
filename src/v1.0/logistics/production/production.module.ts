import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
    imports:[
        
        ProductModule,
		PresentationModule
    ],
    controllers:[],
    providers:[]
})
export class ProductionModule {}
