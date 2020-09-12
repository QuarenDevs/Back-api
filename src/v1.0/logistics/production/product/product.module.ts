import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { schema as ProductSchema } from './product.mg-document';
import { schema as CompanySchema } from 'src/v1.0/core/company-info/company/company.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Company', schema:CompanySchema}
        ]),
        MongooseModule.forFeature([
            {name:'Product', schema:ProductSchema}
        ]),
        
    ],
    controllers:[ProductController],
    providers:[
        ProductService
    ]
})
export class ProductModule {}
