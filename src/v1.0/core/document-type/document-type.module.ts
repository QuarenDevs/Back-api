import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './document-type.mg-document';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeController } from './document-type.controller';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'DocumentType', schema:schema}
        ]),
        
    ],
    controllers:[DocumentTypeController],
    providers:[DocumentTypeService]
})
export class DocumentTypeModule {}
