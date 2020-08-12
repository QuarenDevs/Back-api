import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoroughService } from './borough.service';
import { Borough } from './borough.mg-document';
import { CreateBorough } from './dto/create-borough.dto';
import { UpdateBorough } from './dto/update-borough.dto';

@ApiTags('Core3 / Country / State / City / Borough')
@Controller('api/v1.0/countries/:idCountry/states/:idState/cities/:idCity/boroughs')
export class BoroughController {
    
    modelName = 'Borough';

    constructor(private boroughService: BoroughService){}

    @Get()
    index(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('idCity') idCity:string): Promise<Borough[]>  {
        return this.boroughService.getBoroughs(idCountry, idState, idCity);
    }

    @Get(':id')
    show(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('idCity') idCity:string, @Param('id') id:string):Promise<Borough>{
        return this.boroughService.getBorough(idCountry, idState, idCity, id);
    }

    @Post()
    create(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('idCity') idCity:string, @Body() bodyParams: CreateBorough):Promise<Borough>{
        return this.boroughService.createBorough(idCountry, idState, idCity, bodyParams);
    }

    
    @Put(':id')
    update(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('idCity') idCity:string, @Param('id') id:string, @Body() bodyParams: UpdateBorough):Promise<Borough>{
        return this.boroughService.updateBorough(idCountry, idState, idCity, id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('idCity') idCity:string, @Param('id') id:string):Promise<Borough>{
        return this.boroughService.deleteBorough(idCountry, idState, idCity, id);
    }

    
    
}
