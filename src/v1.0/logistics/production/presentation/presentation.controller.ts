import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PresentationService } from './presentation.service';
import { Presentation } from './presentation.mg-document';
import { CreatePresentation } from './dto/create-presentation.dto';
import { UpdatePresentation } from './dto/update-presentation.dto';

@ApiTags('Logistics / Production / Presentation')
@Controller('api/v1.0/product/:idProduct/presentations')
export class PresentationController {
    
    modelName = 'Presentation';

    constructor(
        private presentationService: PresentationService
        ){}

    @Get()
    index(@Param('idProduct') idProduct:string): Promise<Presentation[]>  {
        return this.presentationService.getPresentations(idProduct);
    }

    @Get(':id')
    show(@Param('idProduct') idProduct:string, @Param('id') id:string):Promise<Presentation>{
        return this.presentationService.getPresentation(id);
    }

    @Post()
    create(@Param('idProduct') idProduct:string, @Body() bodyParams: CreatePresentation):Promise<Presentation>{

        return this.presentationService.createPresentation(idProduct, bodyParams);
    }

    
    @Put(':id')
    update(@Param('idProduct') idProduct:string, @Param('id') id:string, @Body() bodyParams: UpdatePresentation):Promise<Presentation>{
        return this.presentationService.updatePresentation(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idProduct') idProduct:string, @Param('id') id:string):Promise<Presentation>{
        return this.presentationService.deletePresentation(id);
    }

    
    
}
