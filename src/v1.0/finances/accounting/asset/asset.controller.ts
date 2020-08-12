import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { Asset } from './asset.mg-document';
import { CreateAsset } from './dto/create-asset.dto';
import { UpdateAsset } from './dto/update-asset.dto';

@ApiTags('Finances / Accounting / Asset')
@Controller('api/v1.0/assets')
export class AssetController {
    
    modelName = 'Asset';

    constructor(private assetService: AssetService){}

    @Get()
    index(): Promise<Asset[]>  {
        return this.assetService.getAssets();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<Asset>{
        return this.assetService.getAsset(id);
    }

    @Post()
    create(@Body() bodyParams: CreateAsset):Promise<Asset>{
        return this.assetService.createAsset(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateAsset):Promise<Asset>{
        return this.assetService.updateAsset(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<Asset>{
        return this.assetService.deleteAsset(id);
    }

    
    
}
