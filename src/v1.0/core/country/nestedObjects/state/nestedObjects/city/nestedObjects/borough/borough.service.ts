import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { Borough } from './borough.mg-document';
import { CreateBorough } from './dto/create-borough.dto';
import { UpdateBorough } from './dto/update-borough.dto';
import { CityService } from '../../city.service';
import { City } from '../../city.mg-document';
import { Country } from 'src/v1.0/core/country/country.mg-document';

@Injectable()
export class BoroughService {

    serviceModel = 'Borough';
    
    constructor(
        private cityService: CityService,
        @InjectModel('Borough') private boroughModel: ExtendedModel<Borough>
        ){}

    
    async getAncestors(idCountry:string, idState:string, idCity:string, idBorough = '' ):Promise<DocumentAncestor[]>
    {
        const ancestors:DocumentAncestor[] = await this.cityService.getAncestors(idCountry, idState, idCity);
        ancestors[0].markModifiedPathCollection = `states.${ancestors[1].documentIndex}.cities.${ancestors[2].documentIndex}.boroughs`
        if(idBorough != '')
        {
            const city = ancestors[ancestors.length - 1].document as City
            const foundIndex = city.boroughs.findIndex(borough => (borough.sid == idBorough) && (borough.deletedAt == null));
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idState} was not found`, HttpStatus.NOT_FOUND);
            }
            ancestors[0].markModifiedPathDocument = `states.${ancestors[1].documentIndex}.cities.${ancestors[2].documentIndex}.boroughs.${foundIndex}`
            ancestors.push(new DocumentAncestor(city.boroughs[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getBoroughs(idCountry:string, idState:string, idCity:string): Promise<Borough[]>
    {
        const ancestors = await this.getAncestors(idCountry, idState, idCity);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as City

        return parentDocument.boroughs.filter(child => child.deletedAt == null);
    }

    async getBorough(idCountry:string, idState:string, idCity:string, id: string): Promise<Borough>
    {
        const ancestors = await this.getAncestors(idCountry, idState, idCity, id);
        const foundBorough = ancestors[ancestors.length - 1].document as Borough;

        return foundBorough;
    }

    async createBorough(idCountry:string, idState:string, idCity:string, borough: CreateBorough):Promise<Borough>{
        
        const ancestors = await this.getAncestors(idCountry, idState, idCity)
        const ownerDocument = ancestors[0].document as Country
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as City

        const newObject = await this.boroughModel.createObject(borough);
        parentDocument.boroughs.push(newObject);
        
        ownerDocument.markModified(`states.${ancestors[1].documentIndex}.cities.${ancestors[2].documentIndex}.boroughs`)
        
        const result = await ownerDocument.save();
       
        return newObject;
    }
    
    async updateBorough(idCountry:string, idState:string, idCity:string, id:string, borough: UpdateBorough):Promise<Borough>{
        const ancestors = await this.getAncestors(idCountry, idState, idCity, id);
        const ownerDocument = ancestors[0].document as Country
        
        const foundBoroughAncestor = ancestors[ancestors.length - 1];
        
        const foundBorough = foundBoroughAncestor.document as Borough;

        Object.assign(foundBorough, borough);
        foundBorough.updatedAt = new Date().toString();
        

        ownerDocument.markModified(`states.${ancestors[1].documentIndex}.cities.${ancestors[2].documentIndex}.boroughs.${foundBoroughAncestor.documentIndex}`)
        const result = await ownerDocument.save();

        return foundBorough;
    }

    async deleteBorough(idCountry:string, idState:string, idCity:string, id:string):Promise<Borough>{
        // const deletedObject = await this.boroughModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        //const deletedObject = await this.boroughModel.softDelete(id);
        
        //return deletedObject;
        const ancestors = await this.getAncestors(idCountry, idState, idCity, id);
        const ownerDocument = ancestors[0].document as Country

        const foundBoroughAncestor = ancestors[ancestors.length - 1];
        const foundBorough = foundBoroughAncestor.document as Borough;

        foundBorough.updatedAt = new Date().toString();
        foundBorough.deletedAt = foundBorough.updatedAt;

        ownerDocument.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await ownerDocument.save();

        //throw new HttpException(`sadasd ${ancestors[0].markModifiedPathCollection}   ${ancestors[0].markModifiedPathDocument}`, HttpStatus.NOT_FOUND);
        return foundBorough;
    }
}
