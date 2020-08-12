import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Country } from './country.mg-document';
import { CreateCountry } from './dto/create-country.dto';
import { UpdateCountry } from './dto/update-country.dto';

@Injectable()
export class CountryService {

    constructor(@InjectModel('Country') private countryModel: ExtendedModel<Country>)
    {}
    
    async getAncestors(idCountry:string ):Promise<DocumentAncestor[]>
    {
        const country = await this.countryModel.findBySID(idCountry);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(country)];
        return ancestors;
    }

    async getCountries(): Promise<Country[]>
    {
        return await this.countryModel.getAll();
    }

    async getCountry(id: string): Promise<Country>
    {
        return await this.countryModel.findBySID(id);
    }

    async createCountry(country: CreateCountry):Promise<Country>
    {
        const newObject = this.countryModel.store(country);    
        return await newObject;
    }
    
    async updateCountry(id:string, country: UpdateCountry):Promise<Country>
    {
        const updatedObject = await this.countryModel.updateBySID(id, country);    
        return updatedObject;
    }

    async deleteCountry(id:string):Promise<Country>
    {
        const deletedObject = await this.countryModel.softDelete(id);    
        return deletedObject;
    }
}
