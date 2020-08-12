import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel, ExtendedDocument, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { City } from './city.mg-document';
import { CreateCity } from './dto/create-city.dto';
import { UpdateCity } from './dto/update-city.dto';
import { StateService } from '../../state.service';
import { State } from '../../state.mg-document';
import { Document } from 'mongoose';
import { Country } from 'src/v1.0/core/country/country.mg-document';

@Injectable()
export class CityService {

    serviceModel = 'City';

    constructor(
        private stateService: StateService,
        @InjectModel('City') private cityModel: ExtendedModel<City>
        ){}

        

    async getStateParent(idCountry:string, idState:string):Promise<State>
    {
        return await this.stateService.getState(idCountry, idState);
    }

    async getOwnerDocument(idCountry:string):Promise<Country>
    {
        return this.stateService.getOwnerDocument(idCountry)
    }

    async getAncestors(idCountry:string, idState:string, idCity = '' ):Promise<DocumentAncestor[]>
    {
        const ancestors:DocumentAncestor[] = await this.stateService.getAncestors(idCountry, idState);
        if(idCity != '')
        {
            const state = ancestors[ancestors.length - 1].document as State
            const cityIndex = state.cities.findIndex(city => city.sid == idCity);
            if( cityIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idState} was not found`, HttpStatus.NOT_FOUND);
            }
            ancestors.push(new DocumentAncestor(state.cities[cityIndex], cityIndex));
        }
        return ancestors;
    }
    
    // async getAncestors(idCountry:string, idState:string ):Promise<ExtendedDocument[]>
    // {
    //     const ancestors:number[] = await this.stateService.getAncestors(idCountry);
    //     const country = ancestors[ancestors.length - 1] as Country
    //     const result =  country.states.find(currentState => currentState.sid == idState);
    //     if(!result)
    //     {
    //         throw new HttpException(`Document of aasdtype ${this.serviceModel} and id ${idState} was not found`, HttpStatus.NOT_FOUND);
    //     }
    //     ancestors.push(result);
    //     return ancestors;
    // }

    // async getOwnerDocument(idCountry:string, idState:string):Promise<ExtendedDocument>
    // {
    //     return await this.stateService.getOwnerDocument(idCountry, idState);
    // }
    async getCities(idCountry:string, idState:string ): Promise<City[]>
    {
        //return await this.cityModel.find();
        //return await this.cityModel.getAll();
        const stateParent = await this.getStateParent(idCountry, idState);
        return stateParent.cities;
    }

    async getCity(idCountry:string, idState:string, id: string): Promise<City>
    {
        //return await this.cityModel.findById(id);
        //return await this.cityModel.findBySID(id);
        const stateParent = await this.getStateParent(idCountry, idState);
        const result = stateParent.cities.find(currentCity => currentCity.sid == id);
        if(!result)
        {
            throw new HttpException(`Document of type ${this.serviceModel} and id ${id} was not found`, HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async createCity(idCountry:string, idState:string, city: CreateCity):Promise<City>{
        // const newObject = this.cityModel.store(city);
        
        // return await newObject;
        //const stateParent = await this.getStateParent(idCountry, idState);
        const ancestors = await this.getAncestors(idCountry, idState)
        const ownerDocument = ancestors[0].document as Country
        const parent = ancestors[ancestors.length - 1]
        const parentState = parent.document as State

        const newObject = await this.cityModel.createObject(city);
        parentState.cities.push(newObject);
        Logger.error(ownerDocument)
        
        ownerDocument.markModified(`states.${parent.documentIndex}.cities`)
        //ownerDocument.markModified('countries')
        ownerDocument.states.findIndex(state => state.sid == idState)
        Logger.error("SALVANDO OWNER")
        
        await ownerDocument.save();
        //Logger.warn()
        
        
//        await stateParent.ownerDocument.save();
        
        return await newObject;
    }
    
    async updateCity(id:string, city: UpdateCity):Promise<City>{
        const updatedObject = await this.cityModel.updateBySID(id, city);
        
        return updatedObject;
    }

    async deleteCity(id:string):Promise<City>{
        // const deletedObject = await this.cityModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.cityModel.softDelete(id);
        
        return deletedObject;
    }
}
