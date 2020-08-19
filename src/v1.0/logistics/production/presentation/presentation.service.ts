import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Presentation } from './presentation.mg-document';
import { CreatePresentation } from './dto/create-presentation.dto';
import { UpdatePresentation } from './dto/update-presentation.dto';
import { Product } from '../product/product.mg-document';

@Injectable()
export class PresentationService {

    constructor(
        @InjectModel('Product') private productModel: ExtendedModel<Product>,
        @InjectModel('Presentation') private presentationModel: ExtendedModel<Presentation>
        )
    {}
    
    async getAncestors(idPresentation:string ):Promise<DocumentAncestor[]>
    {
        const presentation = await this.presentationModel.findBySID(idPresentation);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(presentation)];
        return ancestors;
    }

    async getPresentations(idProduct:string): Promise<Presentation[]>
    {
        let product = await this.productModel.findBySID(idProduct);
        
        product = await product.populate('presentations').execPopulate();
        
        return product.presentations;
    }

    async getPresentation(id: string): Promise<Presentation>
    {
        return await this.presentationModel.findBySID(id);
    }

    async createPresentation(idProduct:string, presentation: CreatePresentation):Promise<Presentation>
    {
        const product:Product = await this.productModel.findBySID(idProduct) as Product;
        
        let newObject = await this.presentationModel.store(presentation);    
        
        newObject.product = product._id;
        newObject = await newObject.save()
        product.presentations.push(newObject._id);
        await product.save();

        return await newObject;
    }
    
    async updatePresentation(id:string, presentation: UpdatePresentation):Promise<Presentation>
    {
        const updatedObject = await this.presentationModel.updateBySID(id, presentation);    
        return updatedObject;
    }

    async deletePresentation(id:string):Promise<Presentation>
    {
        const deletedObject = await this.presentationModel.softDelete(id);    
        return deletedObject;
    }
}
