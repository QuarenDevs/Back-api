import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { schema as AssetSchema } from './asset.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'Asset', schema:AssetSchema}
        ]),
        
    ],
    controllers:[AssetController],
    providers:[
        AssetService
    ]
})
export class AssetModule {}
