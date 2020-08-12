import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnit } from './measurement-unit.mg-document';
import { CreateMeasurementUnit } from './dto/create-measurement-unit.dto';
import { UpdateMeasurementUnit } from './dto/update-measurement-unit.dto';

@ApiTags('Core3 / Measurement Unit')
@Controller('api/v1.0/measurement_units')
export class MeasurementUnitController {
    
    modelName = 'MeasurementUnit';

    constructor(private measurementUnitService: MeasurementUnitService){}

    @Get()
    index(): Promise<MeasurementUnit[]>  {
        return this.measurementUnitService.getMeasurementUnits();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<MeasurementUnit>{
        return this.measurementUnitService.getMeasurementUnit(id);
    }

    @Post()
    create(@Body() bodyParams: CreateMeasurementUnit):Promise<MeasurementUnit>{
        return this.measurementUnitService.createMeasurementUnit(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateMeasurementUnit):Promise<MeasurementUnit>{
        return this.measurementUnitService.updateMeasurementUnit(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<MeasurementUnit>{
        return this.measurementUnitService.deleteMeasurementUnit(id);
    }

    
    
}
