import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { CiiuDivision } from './ciiu-division.mg-document';
import { CreateCiiuDivision } from './dto/create-ciiu-division.dto';
import { UpdateCiiuDivision } from './dto/update-ciiu-division.dto';

@Injectable()
export class CiiuDivisionService {

    constructor(@InjectModel('CiiuDivision') private ciiuDivisionModel: ExtendedModel<CiiuDivision>){}

    async getCiiuDivisions(): Promise<CiiuDivision[]>
    {
        //return await this.ciiuDivisionModel.find();
        return await this.ciiuDivisionModel.getAll();
    }

    async getCiiuDivision(id: string): Promise<CiiuDivision>
    {
        //return await this.ciiuDivisionModel.findById(id);
        return await this.ciiuDivisionModel.findBySID(id);
    }

    async createCiiuDivision(ciiuDivision: CreateCiiuDivision):Promise<CiiuDivision>{
        const newObject = this.ciiuDivisionModel.store(ciiuDivision);
        
        return await newObject;
    }
    
    async updateCiiuDivision(id:string, ciiuDivision: UpdateCiiuDivision):Promise<CiiuDivision>{
        const updatedObject = await this.ciiuDivisionModel.updateBySID(id, ciiuDivision);
        
        return updatedObject;
    }

    async deleteCiiuDivision(id:string):Promise<CiiuDivision>{
        // const deletedObject = await this.ciiuDivisionModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.ciiuDivisionModel.softDelete(id);
        
        return deletedObject;
    }
}
