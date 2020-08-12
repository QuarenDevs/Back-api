import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DigitalAdService } from './digital-ad.service';
import { DigitalAd } from './digital-ad.mg-document';
import { CreateDigitalAd } from './dto/create-digital-ad.dto';
import { UpdateDigitalAd } from './dto/update-digital-ad.dto';

@ApiTags('Marketing / Advertising / Digital Ad')
@Controller('api/v1.0/digital_ads')
export class DigitalAdController {
    
    modelName = 'DigitalAd';

    constructor(private digitalAdService: DigitalAdService){}

    @Get()
    index(): Promise<DigitalAd[]>  {
        return this.digitalAdService.getDigitalAds();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<DigitalAd>{
        return this.digitalAdService.getDigitalAd(id);
    }

    @Post()
    create(@Body() bodyParams: CreateDigitalAd):Promise<DigitalAd>{
        return this.digitalAdService.createDigitalAd(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateDigitalAd):Promise<DigitalAd>{
        return this.digitalAdService.updateDigitalAd(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<DigitalAd>{
        return this.digitalAdService.deleteDigitalAd(id);
    }

    
    
}
