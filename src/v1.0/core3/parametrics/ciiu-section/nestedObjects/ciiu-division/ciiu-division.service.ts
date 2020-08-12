import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { CiiuDivision } from './ciiu-division.mg-document';
import { CreateCiiuDivision } from './dto/create-ciiu-division.dto';
import { UpdateCiiuDivision } from './dto/update-ciiu-division.dto';
// Nested path imports
import { CiiuSectionService } from '../../ciiu-section.service';
import { CiiuSection } from '../../ciiu-section.mg-document';


@Injectable()
export class CiiuDivisionService {

    serviceModel = 'CiiuDivision';

    constructor(
        private ciiuSectionService: CiiuSectionService,
        @InjectModel('CiiuSection') private ciiuSectionModel: ExtendedModel<CiiuSection>,
        @InjectModel('CiiuDivision') private ciiuDivisionModel: ExtendedModel<CiiuDivision>
        ){}
    
    async getAncestors(idCiiuSection:string, idCiiuDivision = '' ):Promise<DocumentAncestor[]>
    {
        // Get all the ancestors
        const ancestors:DocumentAncestor[] = await this.ciiuSectionService.getAncestors(idCiiuSection);
        // Create the path for the current model collection (CiiuDivision)
        ancestors[0].markModifiedPathCollection = `ciiuDivisions`;

        // Get the data of the requested document, given its sid 
        if(idCiiuDivision != '')
        {
            const ciiuSection = ancestors[ancestors.length - 1].document as CiiuSection
            // Find the index by sid when the document is not deleted
            const foundIndex = ciiuSection.ciiuDivisions.findIndex(ciiuDivision => (ciiuDivision.sid == idCiiuDivision) && (ciiuDivision.deletedAt == null));
            
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idCiiuDivision} was not found`, HttpStatus.NOT_FOUND);
            }
        
            // Create the path for the current model collection (CiiuDivision)
            ancestors[0].markModifiedPathDocument = `${ancestors[0].markModifiedPathCollection}.${foundIndex}`;

            // Add the result to the response
            ancestors.push(new DocumentAncestor(ciiuSection.ciiuDivisions[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getCiiuDivisions(idCiiuSection:string): Promise<CiiuDivision[]>
    {
        // Get the ancestors
        const ancestors = await this.getAncestors(idCiiuSection);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as CiiuSection

        return parentDocument.ciiuDivisions.filter(child => child.deletedAt == null);
    }

    async getCiiuDivision(idCiiuSection:string, id: string): Promise<CiiuDivision>
    {
        // Get the ancestors and the requested document
        const ancestors = await this.getAncestors(idCiiuSection, id);
        const foundCiiuDivision = ancestors[ancestors.length - 1].document as CiiuDivision;

        return foundCiiuDivision;
    }


    async createNested(idCiiuSection:string, ciiuDivision: CreateCiiuDivision):Promise<CiiuDivision>
    {
        const section = this.ciiuSectionModel.findBySID(idCiiuSection);
        const newObject = new this.ciiuDivisionModel(ciiuDivision);
        (await section).ciiuNestedDivisions.push(newObject);
        (await section).save();
        Logger.warn(ciiuDivision);
        return newObject;
    }

    async createCiiuDivision(idCiiuSection:string, ciiuDivision: CreateCiiuDivision):Promise<CiiuDivision>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCiiuSection)
        const documentOwner = ancestors[0].document as CiiuSection
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as CiiuSection

        // Create the new document
        const newObject = await this.ciiuDivisionModel.createObject(ciiuDivision);
        parentDocument.ciiuDivisions.push(newObject);
        
        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathCollection}`)
        const result = await documentOwner.save();
       
        return newObject;
    }
    
    async updateCiiuDivision(idCiiuSection:string, id:string, ciiuDivision: UpdateCiiuDivision):Promise<CiiuDivision>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCiiuSection, id);
        const documentOwner = ancestors[0].document as CiiuSection

        // Get the requested Document
        const foundCiiuDivisionAncestor = ancestors[ancestors.length - 1];
        const foundCiiuDivision = foundCiiuDivisionAncestor.document as CiiuDivision;

        // Update the Document
        Object.assign(foundCiiuDivision, ciiuDivision);
        foundCiiuDivision.updatedAt = new Date().toString();

        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundCiiuDivision;
    }

    async deleteCiiuDivision(idCiiuSection:string, id:string):Promise<CiiuDivision>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCiiuSection, id);
        const documentOwner = ancestors[0].document as CiiuSection

        // Get the requested Document
        const foundCiiuDivisionAncestor = ancestors[ancestors.length - 1];
        const foundCiiuDivision = foundCiiuDivisionAncestor.document as CiiuDivision;


        // Mark the found CiiuDivision as deleted
        foundCiiuDivision.updatedAt = new Date().toString();
        foundCiiuDivision.deletedAt = foundCiiuDivision.updatedAt;


        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundCiiuDivision;
    }
}
