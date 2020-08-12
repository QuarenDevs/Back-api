import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Company } from './company.mg-document';
import { CreateCompany } from './dto/create-company.dto';
import { UpdateCompany } from './dto/update-company.dto';

@ApiTags('Core / Company Info / Company')
@Controller('api/v1.0/companies')
export class CompanyController {
    
    modelName = 'Company';

    constructor(private companyService: CompanyService){}

    @Get()
    index(): Promise<Company[]>  {
        return this.companyService.getCompanies();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<Company>{
        return this.companyService.getCompany(id);
    }

    @Post()
    create(@Body() bodyParams: CreateCompany):Promise<Company>{
        return this.companyService.createCompany(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateCompany):Promise<Company>{
        return this.companyService.updateCompany(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<Company>{
        return this.companyService.deleteCompany(id);
    }

    
    
}
