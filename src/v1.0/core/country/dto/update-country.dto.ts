import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdateCountry{

    @ApiProperty({
        type: Boolean,
        description: 'Indicates if the asset is visible or not'
    })
    @IsOptional()
    isVisible: boolean;

    
    @ApiProperty({
        type: Date,
        description: 'Indicates if the asset is visible or not'
    })
    @IsOptional()
    initialDate: string;
    
    @ApiProperty({
        type: String,
        description: 'Name of the asset',
        default: ''
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Number,
        description: 'Year when the asset was acquired',
        default: 0
    })
    @IsInt()
    year: number;
    
    @ApiPropertyOptional({
        type: Number,
        description: 'Value of the asset. $ COP',
        default: ''
    })
    @Min(1)
    value: number;
    
}