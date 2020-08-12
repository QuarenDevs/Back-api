import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { DocumentType } from './document-type.mg-document';
import { CreateDocumentType } from './dto/create-document-type.dto';
import { UpdateDocumentType } from './dto/update-document-type.dto';

@Injectable()
export class DocumentTypeService {

    constructor(@InjectModel('DocumentType') private documentTypeModel: ExtendedModel<DocumentType>)
    {}
    
    async getAncestors(idDocumentType:string ):Promise<DocumentAncestor[]>
    {
        const documentType = await this.documentTypeModel.findBySID(idDocumentType);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(documentType)];
        return ancestors;
    }

    async getDocumentTypes(): Promise<DocumentType[]>
    {
        return await this.documentTypeModel.getAll();
    }

    async getDocumentType(id: string): Promise<DocumentType>
    {
        return await this.documentTypeModel.findBySID(id);
    }

    async createDocumentType(documentType: CreateDocumentType):Promise<DocumentType>
    {
        const newObject = this.documentTypeModel.store(documentType);    
        return await newObject;
    }
    
    async updateDocumentType(id:string, documentType: UpdateDocumentType):Promise<DocumentType>
    {
        const updatedObject = await this.documentTypeModel.updateBySID(id, documentType);    
        return updatedObject;
    }

    async deleteDocumentType(id:string):Promise<DocumentType>
    {
        const deletedObject = await this.documentTypeModel.softDelete(id);    
        return deletedObject;
    }
}
