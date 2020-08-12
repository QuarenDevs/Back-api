import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentTypeController } from './document-type.controller';
import { DocumentTypeService } from './document-type.service';
import { schema as DocumentTypeSchema } from './document-type.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'DocumentType', schema:DocumentTypeSchema}
        ]),
        
    ],
    controllers:[DocumentTypeController],
    providers:[
        DocumentTypeService
    ]
})
export class DocumentTypeModule {}
