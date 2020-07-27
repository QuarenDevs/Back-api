import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt } from 'class-validator';

export class CreateUser{

    
    @ApiProperty({
        type: String,
        description: 'Name of the user',
        default: ''
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Lastname of the user',
        default: ''
    })
    @IsString()
    lastname: string;

    @ApiProperty({
        type: String,
        description: 'Email of the user',
        default: ''
    })
    @IsString()
    email: string;
    
    @ApiProperty({
        type: Date,
        description: 'Birthday of the user'
    })
    birthday: string;

    @ApiProperty({
        type: String,
        description: 'Document number as string',
        default: 0
    })
    @IsString()
    documentNumber: string;
    
}