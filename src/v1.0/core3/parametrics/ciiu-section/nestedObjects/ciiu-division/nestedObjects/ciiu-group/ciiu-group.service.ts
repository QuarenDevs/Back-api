import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { CiiuGroup } from './ciiu-group.mg-document';
import { CreateCiiuGroup } from './dto/create-ciiu-group.dto';
import { UpdateCiiuGroup } from './dto/update-ciiu-group.dto';
// Nested path imports
import { CiiuDivisionService } from '../../ciiu-division.service';
import { CiiuDivision } from '../../ciiu-division.mg-document';
import { CiiuSection } from 'src/v1.0/core3/parametrics/ciiu-section/ciiu-section.mg-document';

@Injectable()
export class CiiuGroupService {

    serviceModel = 'CiiuGroup';

    constructor(
        private ciiuDivisionService: CiiuDivisionService,
        @InjectModel('CiiuGroup') private ciiuGroupModel: ExtendedModel<CiiuGroup>,
        @InjectModel('CiiuDivision') private ciiuDivisionModel: ExtendedModel<CiiuDivision>,
        
        ){}
    
    async getAncestors(idCiiuSection:string, idCiiuDivision:string, idCiiuGroup = '' ):Promise<DocumentAncestor[]>
    {
        // Get all the ancestors
        const ancestors:DocumentAncestor[] = await this.ciiuDivisionService.getAncestors(idCiiuSection, idCiiuDivision);
        // Create the path for the current model collection (CiiuGroup)
        ancestors[0].markModifiedPathCollection = `ciiuDivisions.${ancestors[1].documentIndex}.ciiuGroups`;

        // Get the data of the requested document, given its sid 
        if(idCiiuGroup != '')
        {
            const ciiuDivision = ancestors[ancestors.length - 1].document as CiiuDivision
            // Find the index by sid when the document is not deleted
            const foundIndex = ciiuDivision.ciiuGroups.findIndex(ciiuGroup => (ciiuGroup.sid == idCiiuGroup) && (ciiuGroup.deletedAt == null));
            
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idCiiuGroup} was not found`, HttpStatus.NOT_FOUND);
            }
        
            // Create the path for the current model collection (CiiuGroup)
            ancestors[0].markModifiedPathDocument = `${ancestors[0].markModifiedPathCollection}.${foundIndex}`;

            // Add the result to the response
            ancestors.push(new DocumentAncestor(ciiuDivision.ciiuGroups[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getCiiuGroups(idCiiuSection:string, idCiiuDivision:string): Promise<CiiuGroup[]>
    {
        // Get the ancestors
        const ancestors = await this.getAncestors(idCiiuSection, idCiiuDivision);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as CiiuDivision

        return parentDocument.ciiuGroups.filter(child => child.deletedAt == null);
    }

    async getCiiuGroup(idCiiuSection:string, idCiiuDivision:string, id: string): Promise<CiiuGroup>
    {
        // Get the ancestors and the requested document
        const ancestors = await this.getAncestors(idCiiuSection, idCiiuDivision, id);
        const foundCiiuGroup = ancestors[ancestors.length - 1].document as CiiuGroup;

        return foundCiiuGroup;
    }

    async createCiiuGroup(idCiiuSection:string, idCiiuDivision:string, ciiuGroup: CreateCiiuGroup):Promise<CiiuGroup>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCiiuSection, idCiiuDivision)
        const documentOwner = ancestors[0].document as CiiuSection
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as CiiuDivision

        // Create the new document
        const newObject = await this.ciiuGroupModel.createObject(ciiuGroup);
        parentDocument.ciiuGroups.push(newObject);
        
        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathCollection}`)
        const result = await documentOwner.save();
       
        return newObject;
    }
    

    async createNested(idCiiuSection:string, idCiiuDivision:string, ciiuGroup: CreateCiiuGroup):Promise<CiiuGroup>
    {
        const division = this.ciiuDivisionModel.findBySID(idCiiuSection);
        const newObject = new this.ciiuGroupModel(ciiuGroup);
        (await division).ciiuNestedGroups.push(newObject);
        (await division).save();
        return newObject;
    }

    async updateCiiuGroup(idCiiuSection:string, idCiiuDivision:string, id:string, ciiuGroup: UpdateCiiuGroup):Promise<CiiuGroup>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCiiuSection, idCiiuDivision, id);
        const documentOwner = ancestors[0].document as CiiuSection

        // Get the requested Document
        const foundCiiuGroupAncestor = ancestors[ancestors.length - 1];
        const foundCiiuGroup = foundCiiuGroupAncestor.document as CiiuGroup;

        // Update the Document
        Object.assign(foundCiiuGroup, ciiuGroup);
        foundCiiuGroup.updatedAt = new Date().toString();

        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundCiiuGroup;
    }

    async deleteCiiuGroup(idCiiuSection:string, idCiiuDivision:string, id:string):Promise<CiiuGroup>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCiiuSection, idCiiuDivision, id);
        const documentOwner = ancestors[0].document as CiiuSection

        // Get the requested Document
        const foundCiiuGroupAncestor = ancestors[ancestors.length - 1];
        const foundCiiuGroup = foundCiiuGroupAncestor.document as CiiuGroup;


        // Mark the found CiiuGroup as deleted
        foundCiiuGroup.updatedAt = new Date().toString();
        foundCiiuGroup.deletedAt = foundCiiuGroup.updatedAt;


        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundCiiuGroup;
    }
}
