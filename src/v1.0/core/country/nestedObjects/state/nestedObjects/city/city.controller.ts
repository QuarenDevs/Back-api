import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { City } from './city.mg-document';
import { CreateCity } from './dto/create-city.dto';
import { UpdateCity } from './dto/update-city.dto';

@ApiTags('Core / Country / State / City')
@Controller('api/v1.0/countries/:idCountry/states/:idState/cities')
export class CityController {
    
    modelName = 'City';

    constructor(private cityService: CityService){}

    @Get()
    index(@Param('idCountry') idCountry:string, @Param('idState') idState:string): Promise<City[]>  {
        return this.cityService.getCities();
    }

    @Get(':id')
    show(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('id') id:string):Promise<City>{
        return this.cityService.getCity(id);
    }

    @Post()
    create(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Body() bodyParams: CreateCity):Promise<City>{
        return this.cityService.createCity(bodyParams);
    }

    
    @Put(':id')
    update(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('id') id:string, @Body() bodyParams: UpdateCity):Promise<City>{
        return this.cityService.updateCity(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idCountry') idCountry:string, @Param('idState') idState:string, @Param('id') id:string):Promise<City>{
        return this.cityService.deleteCity(id);
    }

    
    
}
