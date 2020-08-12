import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementUnitController } from './measurement-unit.controller';
import { MeasurementUnitService } from './measurement-unit.service';
import { schema as MeasurementUnitSchema } from './measurement-unit.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'MeasurementUnit', schema:MeasurementUnitSchema}
        ]),
        
    ],
    controllers:[MeasurementUnitController],
    providers:[
        MeasurementUnitService
    ]
})
export class MeasurementUnitModule {}
