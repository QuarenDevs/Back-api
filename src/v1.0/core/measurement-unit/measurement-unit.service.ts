import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { MeasurementUnit } from './measurement-unit.mg-document';
import { CreateMeasurementUnit } from './dto/create-measurement-unit.dto';
import { UpdateMeasurementUnit } from './dto/update-measurement-unit.dto';

@Injectable()
export class MeasurementUnitService {

    constructor(@InjectModel('MeasurementUnit') private measurementUnitModel: ExtendedModel<MeasurementUnit>){}

    async getMeasurementUnits(): Promise<MeasurementUnit[]>
    {
        //return await this.measurementUnitModel.find();
        return await this.measurementUnitModel.getAll();
    }

    async getMeasurementUnit(id: string): Promise<MeasurementUnit>
    {
        //return await this.measurementUnitModel.findById(id);
        return await this.measurementUnitModel.findBySID(id);
    }

    async createMeasurementUnit(measurementUnit: CreateMeasurementUnit):Promise<MeasurementUnit>{
        const newObject = this.measurementUnitModel.store(measurementUnit);
        
        return await newObject;
    }
    
    async updateMeasurementUnit(id:string, measurementUnit: UpdateMeasurementUnit):Promise<MeasurementUnit>{
        const updatedObject = await this.measurementUnitModel.updateBySID(id, measurementUnit);
        
        return updatedObject;
    }

    async deleteMeasurementUnit(id:string):Promise<MeasurementUnit>{
        // const deletedObject = await this.measurementUnitModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.measurementUnitModel.softDelete(id);
        
        return deletedObject;
    }
}
