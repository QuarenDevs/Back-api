import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { schema as CompanySchema } from './company.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Company', schema:CompanySchema}
        ]),
        
    ],
    controllers:[CompanyController],
    providers:[
        CompanyService
    ]
})
export class CompanyModule {}
