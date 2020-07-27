import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdateDocumentType{

    @ApiPropertyOptional({
        type: String,
        description: 'Name of the Document Type',
        default: ''
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Abbreviation of the Document Type',
        default: ''
    })
    @IsOptional()
    @IsString()
    abbreviation: string;

    
}