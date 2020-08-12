import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { CiiuSection } from './ciiu-section.mg-document';
import { CreateCiiuSection } from './dto/create-ciiu-section.dto';
import { UpdateCiiuSection } from './dto/update-ciiu-section.dto';

@Injectable()
export class CiiuSectionService {

    constructor(@InjectModel('CiiuSection') private ciiuSectionModel: ExtendedModel<CiiuSection>){}

    async getCiiuSections(): Promise<CiiuSection[]>
    {
        //return await this.ciiuSectionModel.find();
        return await this.ciiuSectionModel.getAll();
    }

    async getCiiuSection(id: string): Promise<CiiuSection>
    {
        //return await this.ciiuSectionModel.findById(id);
        return await this.ciiuSectionModel.findBySID(id);
    }

    async createCiiuSection(ciiuSection: CreateCiiuSection):Promise<CiiuSection>{
        const newObject = this.ciiuSectionModel.store(ciiuSection);
        
        return await newObject;
    }
    
    async updateCiiuSection(id:string, ciiuSection: UpdateCiiuSection):Promise<CiiuSection>{
        const updatedObject = await this.ciiuSectionModel.updateBySID(id, ciiuSection);
        
        return updatedObject;
    }

    async deleteCiiuSection(id:string):Promise<CiiuSection>{
        // const deletedObject = await this.ciiuSectionModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.ciiuSectionModel.softDelete(id);
        
        return deletedObject;
    }
}
