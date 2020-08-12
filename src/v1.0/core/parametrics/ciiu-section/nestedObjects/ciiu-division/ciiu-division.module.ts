import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './ciiu-division.mg-document';
import { CiiuDivisionService } from './ciiu-division.service';
import { CiiuDivisionController } from './ciiu-division.controller';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Parametrics', schema:schema}
        ]),
		MongooseModule.forFeature([
            {name:'CiiuSection', schema:schema}
        ]),
		MongooseModule.forFeature([
            {name:'CiiuDivision', schema:schema}
        ])
        
    ],
    controllers:[CiiuDivisionController],
    providers:[CiiuDivisionService]
})
export class CiiuDivisionModule {}
