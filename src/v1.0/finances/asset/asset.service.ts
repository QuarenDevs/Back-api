import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { Asset } from './asset.mg-document';
import { CreateAsset } from './dto/create-asset.dto';
import { UpdateAsset } from './dto/update-asset.dto';

@Injectable()
export class AssetService {

    constructor(@InjectModel('Asset') private assetModel: ExtendedModel<Asset>){}

    async getAssets(): Promise<Asset[]>
    {
        //return await this.assetModel.find();
        return await this.assetModel.getAll();
    }

    async getAsset(id: string): Promise<Asset>
    {
        //return await this.assetModel.findById(id);
        return await this.assetModel.findBySID(id);
    }

    async createAsset(asset: CreateAsset):Promise<Asset>{
        const newObject = this.assetModel.store(asset);
        
        return await newObject;
    }
    
    async updateAsset(id:string, asset: UpdateAsset):Promise<Asset>{
        const updatedObject = await this.assetModel.updateBySID(id, asset);
        
        return updatedObject;
    }

    async deleteAsset(id:string):Promise<Asset>{
        // const deletedObject = await this.assetModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.assetModel.softDelete(id);
        
        return deletedObject;
    }
}
