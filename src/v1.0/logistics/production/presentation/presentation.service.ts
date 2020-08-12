import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Presentation } from './presentation.mg-document';
import { CreatePresentation } from './dto/create-presentation.dto';
import { UpdatePresentation } from './dto/update-presentation.dto';

@Injectable()
export class PresentationService {

    constructor(@InjectModel('Presentation') private presentationModel: ExtendedModel<Presentation>)
    {}
    
    async getAncestors(idPresentation:string ):Promise<DocumentAncestor[]>
    {
        const presentation = await this.presentationModel.findBySID(idPresentation);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(presentation)];
        return ancestors;
    }

    async getPresentations(): Promise<Presentation[]>
    {
        return await this.presentationModel.getAll();
    }

    async getPresentation(id: string): Promise<Presentation>
    {
        return await this.presentationModel.findBySID(id);
    }

    async createPresentation(presentation: CreatePresentation):Promise<Presentation>
    {
        const newObject = this.presentationModel.store(presentation);    
        return await newObject;
    }
    
    async updatePresentation(id:string, presentation: UpdatePresentation):Promise<Presentation>
    {
        const updatedObject = await this.presentationModel.updateBySID(id, presentation);    
        return updatedObject;
    }

    async deletePresentation(id:string):Promise<Presentation>
    {
        const deletedObject = await this.presentationModel.softDelete(id);    
        return deletedObject;
    }
}
