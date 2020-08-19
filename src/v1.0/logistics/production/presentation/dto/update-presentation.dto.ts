import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdatePresentation{

    @ApiPropertyOptional({
        type: String,
        description: 'Formal name of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    formal_name: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Short name or "private" name of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    short_name: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Description of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Measurement quantity of the presentation',
        default: 1
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    measurement_quantity: number;

    @ApiPropertyOptional({
        type: String,
        description: 'Measurement unit of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    measurement_unit: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Minimum stock quantity of units of the presentation tht the warehouse should have',
        default: 0
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    minimum_stock_quantity: number;

    @ApiPropertyOptional({
        type: String,
        description: 'SKU identifier of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    sku: string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Barcode number of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    barcode: string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'Main image of the presentation',
        default: ''
    })
    @IsOptional()
    @IsString()
    image: string;
    
}