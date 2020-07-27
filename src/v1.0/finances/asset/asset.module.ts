import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './asset.mg-document';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Asset', schema:schema}
        ]),
        
    ],
    controllers:[AssetController],
    providers:[AssetService]
})
export class AssetModule {}
