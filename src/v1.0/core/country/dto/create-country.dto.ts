import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt } from 'class-validator';

export class CreateCountry{
    
    @ApiProperty({
        type: String,
        description: 'Name of the country',
        default: ''
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Number,
        description: 'Calling code of the country',
        default: 0
    })
    @IsInt()
    callingCode: number;
    
}