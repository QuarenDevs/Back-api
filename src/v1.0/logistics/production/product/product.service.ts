import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Product } from './product.mg-document';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';

@Injectable()
export class ProductService {

    
    constructor(@InjectModel('Product') private productModel: ExtendedModel<Product>)
    {}
    // removeNulls(obj) {
    //     var isArray = obj instanceof Array;
    //     for (var k in obj) {
    //     Logger.log(k)
    //     //   if (obj[k].deletedAt != null) isArray ? obj.splice(k, 1) : delete obj[k];
    //     //   else if (typeof obj[k] == "object") this.removeNulls(obj[k]);
    //     //   if (isArray && obj.length == k) this.removeNulls(obj);
    //     }
    //     return obj;
    //   }

    async getAncestors(idProduct:string ):Promise<DocumentAncestor[]>
    {
        const product = await this.productModel.findBySID(idProduct);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(product)];
        return ancestors;
    }

    async getProducts(): Promise<Product[]>
    {
        return await this.productModel.getAll();
    }

    async getProduct(id: string): Promise<Product>
    {
        let requested =  await this.productModel.findBySID(id);
        requested = await requested.populate('presentations').execPopulate();
        
        return requested;
    }

    async createProduct(product: CreateProduct):Promise<Product>
    {
        const newObject = this.productModel.store(product);    
        return await newObject;
    }
    
    async updateProduct(id:string, product: UpdateProduct):Promise<Product>
    {
        const updatedObject = await this.productModel.updateBySID(id, product);    
        return updatedObject;
    }

    async deleteProduct(id:string):Promise<Product>
    {
        const deletedObject = await this.productModel.softDelete(id);    
        return deletedObject;
    }
}
