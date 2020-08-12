import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CiiuSectionController } from './ciiu-section.controller';
import { CiiuSectionService } from './ciiu-section.service';
import { schema as CiiuSectionSchema } from './ciiu-section.mg-document';
import { CiiuDivisionModule } from './nestedObjects/ciiu-division/ciiu-division.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'CiiuSection', schema:CiiuSectionSchema}
        ]),
        CiiuDivisionModule
    ],
    controllers:[CiiuSectionController],
    providers:[
        CiiuSectionService
    ]
})
export class CiiuSectionModule {}
