import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { DocumentType } from './document-type.mg-document';
import { CreateDocumentType } from './dto/create-document-type.dto';
import { UpdateDocumentType } from './dto/update-document-type.dto';

@Injectable()
export class DocumentTypeService {

    constructor(@InjectModel('DocumentType') private documentTypeModel: ExtendedModel<DocumentType>){}

    async getDocumentTypes(): Promise<DocumentType[]>
    {
        //return await this.documentTypeModel.find();
        return await this.documentTypeModel.getAll();
    }

    async getDocumentType(id: string): Promise<DocumentType>
    {
        //return await this.documentTypeModel.findById(id);
        return await this.documentTypeModel.findBySID(id);
    }

    async createDocumentType(documentType: CreateDocumentType):Promise<DocumentType>{
        const newObject = this.documentTypeModel.store(documentType);
        
        return await newObject;
    }
    
    async updateDocumentType(id:string, documentType: UpdateDocumentType):Promise<DocumentType>{
        const updatedObject = await this.documentTypeModel.updateBySID(id, documentType);
        
        return updatedObject;
    }

    async deleteDocumentType(id:string):Promise<DocumentType>{
        // const deletedObject = await this.documentTypeModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.documentTypeModel.softDelete(id);
        
        return deletedObject;
    }
}
