import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CiiuDivisionController } from './ciiu-division.controller';
import { CiiuSectionService } from '../../ciiu-section.service';
import { schema as CiiuSectionSchema } from '../../ciiu-section.mg-document';
import { CiiuDivisionService } from './ciiu-division.service';
import { schema as CiiuDivisionSchema } from './ciiu-division.mg-document';
import { CiiuGroupModule } from './nestedObjects/ciiu-group/ciiu-group.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'CiiuSection', schema:CiiuSectionSchema}
        ]),
		MongooseModule.forFeature([
            {name:'CiiuDivision', schema:CiiuDivisionSchema}
        ]),
        CiiuGroupModule
    ],
    controllers:[CiiuDivisionController],
    providers:[
        CiiuSectionService,
		CiiuDivisionService
    ]
})
export class CiiuDivisionModule {}
