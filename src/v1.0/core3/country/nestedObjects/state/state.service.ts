import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { State } from './state.mg-document';
import { CreateState } from './dto/create-state.dto';
import { UpdateState } from './dto/update-state.dto';
// Nested path imports
import { CountryService } from '../../country.service';
import { Country } from '../../country.mg-document';


@Injectable()
export class StateService {

    serviceModel = 'State';

    constructor(
        private countryService: CountryService,
        @InjectModel('State') private stateModel: ExtendedModel<State>
        ){}
    
    async getAncestors(idCountry:string, idState = '' ):Promise<DocumentAncestor[]>
    {
        // Get all the ancestors
        const ancestors:DocumentAncestor[] = await this.countryService.getAncestors(idCountry);
        // Create the path for the current model collection (State)
        ancestors[0].markModifiedPathCollection = `states`;

        // Get the data of the requested document, given its sid 
        if(idState != '')
        {
            const country = ancestors[ancestors.length - 1].document as Country
            // Find the index by sid when the document is not deleted
            const foundIndex = country.states.findIndex(state => (state.sid == idState) && (state.deletedAt == null));
            
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idState} was not found`, HttpStatus.NOT_FOUND);
            }
        
            // Create the path for the current model collection (State)
            ancestors[0].markModifiedPathDocument = `${ancestors[0].markModifiedPathCollection}.${foundIndex}`;

            // Add the result to the response
            ancestors.push(new DocumentAncestor(country.states[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getStates(idCountry:string): Promise<State[]>
    {
        // Get the ancestors
        const ancestors = await this.getAncestors(idCountry);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as Country

        return parentDocument.states.filter(child => child.deletedAt == null);
    }

    async getState(idCountry:string, id: string): Promise<State>
    {
        // Get the ancestors and the requested document
        const ancestors = await this.getAncestors(idCountry, id);
        const foundState = ancestors[ancestors.length - 1].document as State;

        return foundState;
    }

    async createState(idCountry:string, state: CreateState):Promise<State>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry)
        const documentOwner = ancestors[0].document as Country
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as Country

        // Create the new document
        const newObject = await this.stateModel.createObject(state);
        parentDocument.states.push(newObject);
        
        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathCollection}`)
        const result = await documentOwner.save();
       
        return newObject;
    }
    
    async updateState(idCountry:string, id:string, state: UpdateState):Promise<State>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, id);
        const documentOwner = ancestors[0].document as Country

        // Get the requested Document
        const foundStateAncestor = ancestors[ancestors.length - 1];
        const foundState = foundStateAncestor.document as State;

        // Update the Document
        Object.assign(foundState, state);
        foundState.updatedAt = new Date().toString();

        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundState;
    }

    async deleteState(idCountry:string, id:string):Promise<State>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idCountry, id);
        const documentOwner = ancestors[0].document as Country

        // Get the requested Document
        const foundStateAncestor = ancestors[ancestors.length - 1];
        const foundState = foundStateAncestor.document as State;


        // Mark the found State as deleted
        foundState.updatedAt = new Date().toString();
        foundState.deletedAt = foundState.updatedAt;


        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundState;
    }
}
