import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { CiiuSection } from './ciiu-section.mg-document';
import { CreateCiiuSection } from './dto/create-ciiu-section.dto';
import { UpdateCiiuSection } from './dto/update-ciiu-section.dto';

@Injectable()
export class CiiuSectionService {

    constructor(@InjectModel('CiiuSection') private ciiuSectionModel: ExtendedModel<CiiuSection>)
    {}
    
    async getAncestors(idCiiuSection:string ):Promise<DocumentAncestor[]>
    {
        const ciiuSection = await this.ciiuSectionModel.findBySID(idCiiuSection);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(ciiuSection)];
        return ancestors;
    }

    async getCiiuSections(): Promise<CiiuSection[]>
    {
        return await this.ciiuSectionModel.getAll();
    }

    async getCiiuSection(id: string): Promise<CiiuSection>
    {
        return await this.ciiuSectionModel.findBySID(id);
    }

    async createCiiuSection(ciiuSection: CreateCiiuSection):Promise<CiiuSection>
    {
        const newObject = this.ciiuSectionModel.store(ciiuSection);    
        return await newObject;
    }
    
    async updateCiiuSection(id:string, ciiuSection: UpdateCiiuSection):Promise<CiiuSection>
    {
        const updatedObject = await this.ciiuSectionModel.updateBySID(id, ciiuSection);    
        return updatedObject;
    }

    async deleteCiiuSection(id:string):Promise<CiiuSection>
    {
        const deletedObject = await this.ciiuSectionModel.softDelete(id);    
        return deletedObject;
    }
}
