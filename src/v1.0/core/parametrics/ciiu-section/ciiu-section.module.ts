import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './ciiu-section.mg-document';
import { CiiuSectionService } from './ciiu-section.service';
import { CiiuSectionController } from './ciiu-section.controller';
import { CiiuDivisionModule } from './nestedObjects/ciiu-division/ciiu-division.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Parametrics', schema:schema}
        ]),
		MongooseModule.forFeature([
            {name:'CiiuSection', schema:schema}
        ]),
        CiiuDivisionModule,
    ],
    controllers:[CiiuSectionController],
    providers:[CiiuSectionService]
})
export class CiiuSectionModule {}
