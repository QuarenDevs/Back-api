import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdateUser{

    @ApiPropertyOptional({
        type: Boolean,
        description: 'Indicates if the asset is visible or not'
    })
    @IsOptional()
    isVisible: boolean;

    
    @ApiPropertyOptional({
        type: Date,
        description: 'Indicates if the asset is visible or not'
    })
    @IsOptional()
    initialDate: string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Name of the asset',
        default: ''
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Year when the asset was acquired',
        default: 0
    })
    @IsOptional()
    @IsInt()
    year: number;
    
    @ApiPropertyOptional({
        type: Number,
        description: 'Value of the asset. $ COP',
        default: ''
    })
    @IsOptional()
    @Min(1)
    value: number;
    
}