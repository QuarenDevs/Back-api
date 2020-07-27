import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './measurement-unit.mg-document';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnitController } from './measurement-unit.controller';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'MeasurementUnit', schema:schema}
        ]),
        
    ],
    controllers:[MeasurementUnitController],
    providers:[MeasurementUnitService]
})
export class MeasurementUnitModule {}
