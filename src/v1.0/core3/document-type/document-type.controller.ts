import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentTypeService } from './document-type.service';
import { DocumentType } from './document-type.mg-document';
import { CreateDocumentType } from './dto/create-document-type.dto';
import { UpdateDocumentType } from './dto/update-document-type.dto';

@ApiTags('Core3 / Document Type')
@Controller('api/v1.0/document_types')
export class DocumentTypeController {
    
    modelName = 'DocumentType';

    constructor(private documentTypeService: DocumentTypeService){}

    @Get()
    index(): Promise<DocumentType[]>  {
        return this.documentTypeService.getDocumentTypes();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<DocumentType>{
        return this.documentTypeService.getDocumentType(id);
    }

    @Post()
    create(@Body() bodyParams: CreateDocumentType):Promise<DocumentType>{
        return this.documentTypeService.createDocumentType(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateDocumentType):Promise<DocumentType>{
        return this.documentTypeService.updateDocumentType(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<DocumentType>{
        return this.documentTypeService.deleteDocumentType(id);
    }

    
    
}
