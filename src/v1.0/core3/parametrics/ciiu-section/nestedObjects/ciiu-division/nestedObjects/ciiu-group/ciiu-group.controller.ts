import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CiiuGroupService } from './ciiu-group.service';
import { CiiuGroup } from './ciiu-group.mg-document';
import { CreateCiiuGroup } from './dto/create-ciiu-group.dto';
import { UpdateCiiuGroup } from './dto/update-ciiu-group.dto';

@ApiTags('Core3 / Parametrics / Ciiu Section / Ciiu Division / Ciiu Group')
@Controller('api/v1.0/ciiu_sections/:idCiiuSection/ciiu_divisions/:idCiiuDivision/ciiu_groups')
export class CiiuGroupController {
    
    modelName = 'CiiuGroup';

    constructor(private ciiuGroupService: CiiuGroupService){}

    @Get()
    index(@Param('idCiiuSection') idCiiuSection:string, @Param('idCiiuDivision') idCiiuDivision:string): Promise<CiiuGroup[]>  {
        return this.ciiuGroupService.getCiiuGroups(idCiiuSection, idCiiuDivision);
    }

    @Get(':id')
    show(@Param('idCiiuSection') idCiiuSection:string, @Param('idCiiuDivision') idCiiuDivision:string, @Param('id') id:string):Promise<CiiuGroup>{
        return this.ciiuGroupService.getCiiuGroup(idCiiuSection, idCiiuDivision, id);
    }

    @Post()
    create(@Param('idCiiuSection') idCiiuSection:string, @Param('idCiiuDivision') idCiiuDivision:string, @Body() bodyParams: CreateCiiuGroup):Promise<CiiuGroup>{
        return this.ciiuGroupService.createCiiuGroup(idCiiuSection, idCiiuDivision, bodyParams);
    }

    @Post('nested')
    createNested(@Param('idCiiuSection') idCiiuSection:string, @Param('idCiiuDivision') idCiiuDivision:string, @Body() bodyParams: CreateCiiuGroup):Promise<CiiuGroup>{
        return this.ciiuGroupService.createNested(idCiiuSection, idCiiuDivision,  bodyParams);
    }
    
    @Put(':id')
    update(@Param('idCiiuSection') idCiiuSection:string, @Param('idCiiuDivision') idCiiuDivision:string, @Param('id') id:string, @Body() bodyParams: UpdateCiiuGroup):Promise<CiiuGroup>{
        return this.ciiuGroupService.updateCiiuGroup(idCiiuSection, idCiiuDivision, id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idCiiuSection') idCiiuSection:string, @Param('idCiiuDivision') idCiiuDivision:string, @Param('id') id:string):Promise<CiiuGroup>{
        return this.ciiuGroupService.deleteCiiuGroup(idCiiuSection, idCiiuDivision, id);
    }

    
    
}
