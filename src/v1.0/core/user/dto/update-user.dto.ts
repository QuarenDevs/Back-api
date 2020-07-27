import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional, IsEmail } from 'class-validator';

export class UpdateUser{

    @ApiPropertyOptional({
        type: String,
        description: 'Name of the user',
        default: ''
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Lastname of the user',
        default: ''
    })
    @IsOptional()
    @IsString()
    lastname: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Email of the user',
        default: ''
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiPropertyOptional({
        type: Date,
        description: 'Birthday of the user'
    })
    @IsOptional()
    birthday: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Document number as string',
        default: 0
    })
    @IsOptional()
    @IsString()
    documentNumber: string;
    
}