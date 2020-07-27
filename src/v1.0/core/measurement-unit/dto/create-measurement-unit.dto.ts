import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt } from 'class-validator';

export class CreateMeasurementUnit{

    
    @ApiProperty({
        type: String,
        description: 'Name of the measurement unit',
        default: ''
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Symbol of the measurement unit'
    })
    symbol: string;
    
    @ApiProperty({
        type: String,
        description: 'Base Quantity of the measurement unit (Time, Length, Mass, Electronic current, Thermodynamic Temperature, Amount of substance, Luminous intensity, among others)'
    })
    @IsString()
    baseQuantity: string;
    
}