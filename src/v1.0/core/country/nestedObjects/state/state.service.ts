import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { State } from './state.mg-document';
import { CreateState } from './dto/create-state.dto';
import { UpdateState } from './dto/update-state.dto';
import { Country } from '../../country.mg-document';
import { CountryService } from '../../country.service';

@Injectable()
export class StateService {

    serviceModel = 'State';

    constructor(
        private countryService: CountryService,
        @InjectModel('State') private stateModel: ExtendedModel<State>
        ){}

        

    async getCountryParent(idCountry:string):Promise<Country>
    {
        return this.countryService.getCountry(idCountry);
    }
    
    async getOwnerDocument(idCountry:string):Promise<Country>
    {
        return this.countryService.getCountry(idCountry);
    }

    
    async getAncestors(idCountry:string, idState = '' ):Promise<DocumentAncestor[]>
    {
        const ancestors:DocumentAncestor[] = await this.countryService.getAncestors(idCountry);
        if(idState != '')
        {
            const country = ancestors[ancestors.length - 1].document as Country
            const stateIndex = country.states.findIndex(state => state.sid == idState);
            if( stateIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idState} was not found`, HttpStatus.NOT_FOUND);
            }
            ancestors.push(new DocumentAncestor(country.states[stateIndex], stateIndex));
        }
        return ancestors;
    }

    // async getAncestors(idCountry:string, idState = ''):Promise<DocumentAncestor>
    // {
    //     const positions:number[] = [];
    //     const ownerDocument = await this.getOwnerDocument(idCountry);
        


    //     const ancestors = [];
    //     const stateIndex = ownerDocument.states.findIndex(state => state.sid == idState)
    //     ancestors.push(stateIndex);
    //     return positions;
    // }
    async getStates(idCountry:string): Promise<State[]>
    {
        const countryParent = await this.getCountryParent(idCountry);

        //return await this.stateModel.find();
        return countryParent.states;//this.stateModel.getAll();
        //return await this.countryModel.getAllNested<State>('states');
    }

    async getState(idCountry:string, id: string): Promise<State>
    {
        //return await this.stateModel.findById(id);
        //return await this.stateModel.findBySID(id);
        
        const countryParent = await this.getCountryParent(idCountry);
        const result = countryParent.states.find(currentState => currentState.sid == id);
        if(!result)
        {
            throw new HttpException(`Document of type ${this.serviceModel} and id ${id} was not found`, HttpStatus.NOT_FOUND);
        }
        //result.$isDeleted
        //countryParent.db
        //result.ownerDocument = countryParent;
        return result;
    }

    async createState(idCountry:string, state: CreateState):Promise<State>{
        
        const ancestors = await this.getAncestors(idCountry);
        const ownerDocument = ancestors[0].document
        const parent = ancestors[ancestors.length - 1].document as Country

        const newObject = await this.stateModel.createObject(state);
        parent.states.push(newObject);
        // Logger.error(newObject.schema)
        // Logger.error(newObject.schema)
        // Logger.error('=====================')
        // Logger.error(newObject.schema.paths)
        await ownerDocument.save();
        
        return await newObject;
    }
    
    async updateState(id:string, state: UpdateState):Promise<State>{
        const updatedObject = await this.stateModel.updateBySID(id, state);
        
        return updatedObject;
    }

    async deleteState(id:string):Promise<State>{
        // const deletedObject = await this.stateModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.stateModel.softDelete(id);
        
        return deletedObject;
    }
}
