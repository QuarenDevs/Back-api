import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class CreatePresentation{

    
    @ApiProperty({
        type: String,
        description: 'Formal name of the presentation',
        default: ''
    })
    @IsString()
    formal_name: string;

    @ApiProperty({
        type: String,
        description: 'Short name or "private" name of the presentation',
        default: ''
    })
    @IsString()
    short_name: string;

    @ApiProperty({
        type: String,
        description: 'Description of the presentation',
        default: ''
    })
    @IsString()
    description: string;

    @ApiProperty({
        type: Number,
        description: 'Measurement quantity of the presentation',
        default: 1
    })
    @IsInt()
    @Min(1)
    measurement_quantity: number;

    @ApiProperty({
        type: String,
        description: 'Measurement unit of the presentation',
        default: ''
    })
    @IsString()
    measurement_unit: string;

    @ApiProperty({
        type: Number,
        description: 'Minimum stock quantity of units of the presentation tht the warehouse should have',
        default: 0
    })
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
    
    
    @ApiProperty({
        type: String,
        description: 'Main image of the presentation',
        default: ''
    })
    @IsString()
    image: string;

}