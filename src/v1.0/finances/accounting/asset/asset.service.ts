import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Asset } from './asset.mg-document';
import { CreateAsset } from './dto/create-asset.dto';
import { UpdateAsset } from './dto/update-asset.dto';

@Injectable()
export class AssetService {

    constructor(@InjectModel('Asset') private assetModel: ExtendedModel<Asset>)
    {}
    
    async getAncestors(idAsset:string ):Promise<DocumentAncestor[]>
    {
        const asset = await this.assetModel.findBySID(idAsset);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(asset)];
        return ancestors;
    }

    async getAssets(): Promise<Asset[]>
    {
        return await this.assetModel.getAll();
    }

    async getAsset(id: string): Promise<Asset>
    {
        return await this.assetModel.findBySID(id);
    }

    async createAsset(asset: CreateAsset):Promise<Asset>
    {
        const newObject = this.assetModel.store(asset);    
        return await newObject;
    }
    
    async updateAsset(id:string, asset: UpdateAsset):Promise<Asset>
    {
        const updatedObject = await this.assetModel.updateBySID(id, asset);    
        return updatedObject;
    }

    async deleteAsset(id:string):Promise<Asset>
    {
        const deletedObject = await this.assetModel.softDelete(id);    
        return deletedObject;
    }
}
