import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional } from 'class-validator';

export class UpdateCountry{

    @ApiPropertyOptional({
        type: String,
        description: 'Name of the country',
        default: ''
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Calling code of the country',
        default: 0
    })
    @IsOptional()
    @IsInt()
    callingCode: number;
    
}