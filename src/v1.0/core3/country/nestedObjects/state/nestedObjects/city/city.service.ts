import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { City } from './city.mg-document';
import { CreateCity } from './dto/create-city.dto';
import { UpdateCity } from './dto/update-city.dto';
// Nested path imports
import { StateService } from '../../state.service';
import { State } from '../../state.mg-document';
import { Country } from 'src/v1.0/core3/country/country.mg-document';

@Injectable()
export class CityService {

    serviceModel = 'City';

    constructor(
        private stateService: StateService,
        @InjectModel('City') private cityModel: ExtendedModel<City>
        ){}
    
    async getAncestors(idCountry:string, idState:string, idCity = '' ):Promise<DocumentAncestor[]>
    {
        // Get all the ancestors
        const ancestors:DocumentAncestor[] = await this.stateService.getAncestors(idCountry, idState);
        // Create the path for the current model collection (City)
        ancestors[0].markModifiedPathCollection = `states.${ancestors[1].documentIndex}.cities`;

        // Get the data of the requested document, given its sid 
        if(idCity != '')
        {
            const state = ancestors[ancestors.length - 1].document as State
            // Find the index by sid when the document is not deleted
            const foundIndex = state.cities.findIndex(city => (city.sid == idCity) && (city.deletedAt == null));
            
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idCity} was not found`, HttpStatus.NOT_FOUND);
            }
        
            // Create the path for the current model collection (City)
            ancestors[0].markModifiedPathDocument = `${ancestors[0].markModifiedPathCollection}.${foundIndex}`;

            // Add the result to the response
            ancestors.push(new DocumentAncestor(state.cities[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getCities(idCountry:string, idState:string): Promise<City[]>
    {
        // Get the ancestors
        const ancestors = await this.getAncestors(idCountry, idState);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as State

        return parentDocument.cities.filter(child => child.deletedAt == null);
    }

    async getCity(idCountry:string, idState:string, id: string): Promise<City>
    {
        // Get the ancestors and the requested document
        const ancestors = await this.getAncestors(idCountry, idState, id);
        const foundCity = ancestors[ancestors.length - 1].document as City;

        return foundCity;
    }

    async createCity(idCountry:string, idState:string, city: CreateCity):Promise<City>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, idState)
        const documentOwner = ancestors[0].document as Country
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as State

        // Create the new document
        const newObject = await this.cityModel.createObject(city);
        parentDocument.cities.push(newObject);
        
        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathCollection}`)
        const result = await documentOwner.save();
       
        return newObject;
    }
    
    async updateCity(idCountry:string, idState:string, id:string, city: UpdateCity):Promise<City>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, idState, id);
        const documentOwner = ancestors[0].document as Country

        // Get the requested Document
        const foundCityAncestor = ancestors[ancestors.length - 1];
        const foundCity = foundCityAncestor.document as City;

        // Update the Document
        Object.assign(foundCity, city);
        foundCity.updatedAt = new Date().toString();

        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundCity;
    }

    async deleteCity(idCountry:string, idState:string, id:string):Promise<City>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, idState, id);
        const documentOwner = ancestors[0].document as Country

        // Get the requested Document
        const foundCityAncestor = ancestors[ancestors.length - 1];
        const foundCity = foundCityAncestor.document as City;


        // Mark the found City as deleted
        foundCity.updatedAt = new Date().toString();
        foundCity.deletedAt = foundCity.updatedAt;


        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundCity;
    }
}
