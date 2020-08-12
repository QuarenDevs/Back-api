import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Borough } from './borough.mg-document';
import { CreateBorough } from './dto/create-borough.dto';
import { UpdateBorough } from './dto/update-borough.dto';
// Nested path imports
import { CityService } from '../../city.service';
import { City } from '../../city.mg-document';
import { Country } from 'src/v1.0/core3/country/country.mg-document';

@Injectable()
export class BoroughService {

    serviceModel = 'Borough';

    constructor(
        private cityService: CityService,
        @InjectModel('Borough') private boroughModel: ExtendedModel<Borough>
        ){}
    
    async getAncestors(idCountry:string, idState:string, idCity:string, idBorough = '' ):Promise<DocumentAncestor[]>
    {
        // Get all the ancestors
        const ancestors:DocumentAncestor[] = await this.cityService.getAncestors(idCountry, idState, idCity);
        // Create the path for the current model collection (Borough)
        ancestors[0].markModifiedPathCollection = `states.${ancestors[1].documentIndex}.cities.${ancestors[2].documentIndex}.boroughs`;

        // Get the data of the requested document, given its sid 
        if(idBorough != '')
        {
            const city = ancestors[ancestors.length - 1].document as City
            // Find the index by sid when the document is not deleted
            const foundIndex = city.boroughs.findIndex(borough => (borough.sid == idBorough) && (borough.deletedAt == null));
            
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idBorough} was not found`, HttpStatus.NOT_FOUND);
            }
        
            // Create the path for the current model collection (Borough)
            ancestors[0].markModifiedPathDocument = `${ancestors[0].markModifiedPathCollection}.${foundIndex}`;

            // Add the result to the response
            ancestors.push(new DocumentAncestor(city.boroughs[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getBoroughs(idCountry:string, idState:string, idCity:string): Promise<Borough[]>
    {
        // Get the ancestors
        const ancestors = await this.getAncestors(idCountry, idState, idCity);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as City

        return parentDocument.boroughs.filter(child => child.deletedAt == null);
    }

    async getBorough(idCountry:string, idState:string, idCity:string, id: string): Promise<Borough>
    {
        // Get the ancestors and the requested document
        const ancestors = await this.getAncestors(idCountry, idState, idCity, id);
        const foundBorough = ancestors[ancestors.length - 1].document as Borough;

        return foundBorough;
    }

    async createBorough(idCountry:string, idState:string, idCity:string, borough: CreateBorough):Promise<Borough>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, idState, idCity)
        const documentOwner = ancestors[0].document as Country
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as City

        // Create the new document
        const newObject = await this.boroughModel.createObject(borough);
        parentDocument.boroughs.push(newObject);
        
        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathCollection}`)
        const result = await documentOwner.save();
       
        return newObject;
    }
    
    async updateBorough(idCountry:string, idState:string, idCity:string, id:string, borough: UpdateBorough):Promise<Borough>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, idState, idCity, id);
        const documentOwner = ancestors[0].document as Country

        // Get the requested Document
        const foundBoroughAncestor = ancestors[ancestors.length - 1];
        const foundBorough = foundBoroughAncestor.document as Borough;

        // Update the Document
        Object.assign(foundBorough, borough);
        foundBorough.updatedAt = new Date().toString();

        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundBorough;
    }

    async deleteBorough(idCountry:string, idState:string, idCity:string, id:string):Promise<Borough>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, idState, idCity, id);
        const documentOwner = ancestors[0].document as Country

        // Get the requested Document
        const foundBoroughAncestor = ancestors[ancestors.length - 1];
        const foundBorough = foundBoroughAncestor.document as Borough;


        // Mark the found Borough as deleted
        foundBorough.updatedAt = new Date().toString();
        foundBorough.deletedAt = foundBorough.updatedAt;


        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundBorough;
    }
}
