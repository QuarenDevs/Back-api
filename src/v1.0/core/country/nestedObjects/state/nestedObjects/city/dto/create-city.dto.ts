import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt } from 'class-validator';

export class CreateCity{

    @ApiProperty({
        type: Boolean,
        description: 'Indicates if the asset is visible or not'
    })
    isVisible: boolean;

    
    @ApiProperty({
        type: Date,
        description: 'Indicates if the asset is visible or not'
    })
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