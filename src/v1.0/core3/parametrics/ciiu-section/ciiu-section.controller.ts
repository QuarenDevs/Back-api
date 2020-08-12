import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CiiuSectionService } from './ciiu-section.service';
import { CiiuSection } from './ciiu-section.mg-document';
import { CreateCiiuSection } from './dto/create-ciiu-section.dto';
import { UpdateCiiuSection } from './dto/update-ciiu-section.dto';

@ApiTags('Core3 / Parametrics / Ciiu Section')
@Controller('api/v1.0/ciiu_sections')
export class CiiuSectionController {
    
    modelName = 'CiiuSection';

    constructor(private ciiuSectionService: CiiuSectionService){}

    @Get()
    index(): Promise<CiiuSection[]>  {
        return this.ciiuSectionService.getCiiuSections();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<CiiuSection>{
        return this.ciiuSectionService.getCiiuSection(id);
    }

    @Post()
    create(@Body() bodyParams: CreateCiiuSection):Promise<CiiuSection>{
        return this.ciiuSectionService.createCiiuSection(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateCiiuSection):Promise<CiiuSection>{
        return this.ciiuSectionService.updateCiiuSection(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<CiiuSection>{
        return this.ciiuSectionService.deleteCiiuSection(id);
    }

    
    
}
