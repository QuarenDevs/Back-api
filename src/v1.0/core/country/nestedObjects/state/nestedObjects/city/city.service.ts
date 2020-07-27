import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { City } from './city.mg-document';
import { CreateCity } from './dto/create-city.dto';
import { UpdateCity } from './dto/update-city.dto';

@Injectable()
export class CityService {

    constructor(@InjectModel('City') private cityModel: ExtendedModel<City>){}

    async getCities(): Promise<City[]>
    {
        //return await this.cityModel.find();
        return await this.cityModel.getAll();
    }

    async getCity(id: string): Promise<City>
    {
        //return await this.cityModel.findById(id);
        return await this.cityModel.findBySID(id);
    }

    async createCity(city: CreateCity):Promise<City>{
        const newObject = this.cityModel.store(city);
        
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
