import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { Country } from './country.mg-document';
import { CreateCountry } from './dto/create-country.dto';
import { UpdateCountry } from './dto/update-country.dto';

@ApiTags('Core / Country')
@Controller('api/v1.0/countries')
export class CountryController {
    
    modelName = 'Country';

    constructor(private countryService: CountryService){}

    @Get()
    index(): Promise<Country[]>  {
        return this.countryService.getCountries();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<Country>{
        return this.countryService.getCountry(id);
    }

    @Post()
    create(@Body() bodyParams: CreateCountry):Promise<Country>{
        return this.countryService.createCountry(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateCountry):Promise<Country>{
        return this.countryService.updateCountry(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<Country>{
        return this.countryService.deleteCountry(id);
    }

    
    
}
