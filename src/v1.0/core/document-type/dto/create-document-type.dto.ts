import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt } from 'class-validator';

export class CreateDocumentType{

    @ApiProperty({
        type: String,
        description: 'Name of the Document Type',
        default: ''
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Abbreviation of the Document Type',
        default: ''
    })
    @IsString()
    abbreviation: string;

    
}