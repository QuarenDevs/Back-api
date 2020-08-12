import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { DigitalAd } from './digital-ad.mg-document';
import { CreateDigitalAd } from './dto/create-digital-ad.dto';
import { UpdateDigitalAd } from './dto/update-digital-ad.dto';

@Injectable()
export class DigitalAdService {

    constructor(@InjectModel('DigitalAd') private digitalAdModel: ExtendedModel<DigitalAd>)
    {}
    
    async getAncestors(idDigitalAd:string ):Promise<DocumentAncestor[]>
    {
        const digitalAd = await this.digitalAdModel.findBySID(idDigitalAd);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(digitalAd)];
        return ancestors;
    }

    async getDigitalAds(): Promise<DigitalAd[]>
    {
        return await this.digitalAdModel.getAll();
    }

    async getDigitalAd(id: string): Promise<DigitalAd>
    {
        return await this.digitalAdModel.findBySID(id);
    }

    async createDigitalAd(digitalAd: CreateDigitalAd):Promise<DigitalAd>
    {
        const newObject = this.digitalAdModel.store(digitalAd);    
        return await newObject;
    }
    
    async updateDigitalAd(id:string, digitalAd: UpdateDigitalAd):Promise<DigitalAd>
    {
        const updatedObject = await this.digitalAdModel.updateBySID(id, digitalAd);    
        return updatedObject;
    }

    async deleteDigitalAd(id:string):Promise<DigitalAd>
    {
        const deletedObject = await this.digitalAdModel.softDelete(id);    
        return deletedObject;
    }
}
