import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CiiuGroupController } from './ciiu-group.controller';
import { CiiuSectionService } from '../../../../ciiu-section.service';
import { schema as CiiuSectionSchema } from '../../../../ciiu-section.mg-document';
import { CiiuDivisionService } from '../../ciiu-division.service';
import { schema as CiiuDivisionSchema } from '../../ciiu-division.mg-document';
import { CiiuGroupService } from './ciiu-group.service';
import { schema as CiiuGroupSchema } from './ciiu-group.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'CiiuSection', schema:CiiuSectionSchema}
        ]),
		MongooseModule.forFeature([
            {name:'CiiuDivision', schema:CiiuDivisionSchema}
        ]),
		MongooseModule.forFeature([
            {name:'CiiuGroup', schema:CiiuGroupSchema}
        ]),
        
    ],
    controllers:[CiiuGroupController],
    providers:[
        CiiuSectionService,
		CiiuDivisionService,
		CiiuGroupService
    ]
})
export class CiiuGroupModule {}
