import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CiiuDivisionService } from './ciiu-division.service';
import { CiiuDivision } from './ciiu-division.mg-document';
import { CreateCiiuDivision } from './dto/create-ciiu-division.dto';
import { UpdateCiiuDivision } from './dto/update-ciiu-division.dto';

@ApiTags('Core / Parametrics / Ciiu Section / Ciiu Division')
@Controller('api/v1.0/parametrics/ciiu_sections/:idCiiuSection/ciiu_divisions')
export class CiiuDivisionController {
    
    modelName = 'CiiuDivision';

    constructor(private ciiuDivisionService: CiiuDivisionService){}

    @Get()
    index(@Param('idCiiuSection') idCiiuSection:string): Promise<CiiuDivision[]>  {
        return this.ciiuDivisionService.getCiiuDivisions();
    }

    @Get(':id')
    show(@Param('idCiiuSection') idCiiuSection:string, @Param('id') id:string):Promise<CiiuDivision>{
        return this.ciiuDivisionService.getCiiuDivision(id);
    }

    @Post()
    create(@Param('idCiiuSection') idCiiuSection:string, @Body() bodyParams: CreateCiiuDivision):Promise<CiiuDivision>{
        return this.ciiuDivisionService.createCiiuDivision(bodyParams);
    }

    
    @Put(':id')
    update(@Param('idCiiuSection') idCiiuSection:string, @Param('id') id:string, @Body() bodyParams: UpdateCiiuDivision):Promise<CiiuDivision>{
        return this.ciiuDivisionService.updateCiiuDivision(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idCiiuSection') idCiiuSection:string, @Param('id') id:string):Promise<CiiuDivision>{
        return this.ciiuDivisionService.deleteCiiuDivision(id);
    }

    
    
}
