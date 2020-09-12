import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Product } from './product.mg-document';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';
import { Company } from 'src/v1.0/core/company-info/company/company.mg-document';

@Injectable()
export class ProductService {

    
    constructor(
        @InjectModel('Product') private productModel: ExtendedModel<Product>,
        @InjectModel('Company') private companyModel: ExtendedModel<Company>
        )
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
        const idCompany = product.ownerCompany;
        if(!idCompany)
        {
            throw new HttpException(`The company id must be provided. Got '${idCompany}' as Company ID`, HttpStatus.NOT_FOUND);
        }
        const ownerCompany = await this.companyModel.findBySID(idCompany);
        if(!ownerCompany)
        {
            throw new HttpException(`The product must belong to a company and no one with the id ${idCompany} has been found`, HttpStatus.NOT_FOUND);
        }
        product.ownerCompany =  ownerCompany._id;
        const newObject = await this.productModel.store(product); 
        
        ownerCompany.products.push(newObject);
        await ownerCompany.save();
        
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
