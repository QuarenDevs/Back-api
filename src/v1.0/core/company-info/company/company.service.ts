import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { Company } from './company.mg-document';
import { CreateCompany } from './dto/create-company.dto';
import { UpdateCompany } from './dto/update-company.dto';

@Injectable()
export class CompanyService {

    constructor(@InjectModel('Company') private companyModel: ExtendedModel<Company>)
    {}
    
    async getAncestors(idCompany:string ):Promise<DocumentAncestor[]>
    {
        const company = await this.companyModel.findBySID(idCompany);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(company)];
        return ancestors;
    }

    async getCompanies(): Promise<Company[]>
    {
        return await this.companyModel.getAll();
    }

    async getCompany(id: string): Promise<Company>
    {
        let requested = await this.companyModel.findBySID(id);
        requested = await requested.populate('products').execPopulate();
        return requested;
    }

    async createCompany(company: CreateCompany):Promise<Company>
    {
        const newObject = this.companyModel.store(company);    
        return await newObject;
    }
    
    async updateCompany(id:string, company: UpdateCompany):Promise<Company>
    {
        const updatedObject = await this.companyModel.updateBySID(id, company);    
        return updatedObject;
    }

    async deleteCompany(id:string):Promise<Company>
    {
        const deletedObject = await this.companyModel.softDelete(id);    
        return deletedObject;
    }
}
