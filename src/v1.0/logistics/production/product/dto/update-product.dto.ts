import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdateProduct{

    @ApiPropertyOptional({
        type: String,
        description: 'Name of the product',
        default: ''
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Description of the product',
        default: ''
    })
    @IsOptional()
    @IsString()
    description: string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'Main picture of the product',
        default: ''
    })
    @IsOptional()
    @IsString()
    image: string;
    
}