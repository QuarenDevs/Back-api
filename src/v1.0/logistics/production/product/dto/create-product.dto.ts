import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt } from 'class-validator';

export class CreateProduct{
    
    @ApiProperty({
        type: String,
        description: 'SID of the owner company',
        default: ''
    })
    @IsString()
    ownerCompany: string;

    @ApiProperty({
        type: String,
        description: 'Name of the product',
        default: ''
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Description of the product',
        default: ''
    })
    @IsString()
    description: string;

    
    @ApiProperty({
        type: String,
        description: 'Main picture of the product',
        default: ''
    })
    @IsString()
    image: string;

    
}