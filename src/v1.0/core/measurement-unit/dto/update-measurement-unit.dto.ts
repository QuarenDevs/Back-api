import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdateMeasurementUnit{

    @ApiPropertyOptional({
        type: String,
        description: 'Name of the measurement unit',
        default: ''
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Symbol of the measurement unit'
    })
    @IsOptional()
    @IsString()
    symbol: string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Base Quantity of the measurement unit (Time, Length, Mass, Electronic current, Thermodynamic Temperature, Amount of substance, Luminous intensity, among others)'
    })
    @IsOptional()
    @IsString()
    baseQuantity: string;
    
}