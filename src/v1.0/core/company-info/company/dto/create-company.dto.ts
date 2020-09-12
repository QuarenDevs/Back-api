import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsDate, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class CreateCompany{

    
    @ApiProperty({
        type: String,
        description: 'CIIU Section of the Company'
    })
    @IsString()
    ciiuSection:string;
    
    @ApiProperty({
        type: String,
        description: 'CIIU Division of the Company'
    })
    @IsString()
    ciiuDivision:string;
    
    @ApiProperty({
        type: String,
        description: 'CIIU Group of the Company'
    })
    @IsString()
    ciiuGroup:string;
    
    @ApiProperty({
        type: String,
        description: 'CIIU Class of the Company'
    })
    @IsString()
    ciiuClass:string;

    @ApiProperty({
        type: String,
        description: 'Name of the Company'
    })
    @IsString()
    name: string;
    
    @ApiProperty({
        type: String,
        description: 'Document number of the Company'
    })
    @IsString()
    documentNumber: string;
    
    @ApiProperty({
        type: String,
        description: 'Document type of the Company'
    })
    @IsString()
    documentType: string;
    
    @ApiProperty({
        type: String,
        description: 'Short description of the Company'
    })
    @IsString()
    shortDescription:string;
    
    @ApiProperty({
        type: String,
        description: 'Full description of the Company'
    })
    @IsString()
    fullDescription:string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'Foundation date of the Company'
    })
    @IsOptional()
    //@IsDate()
    foundationDate:string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'URL of the logo of the Company'
    })
    @IsOptional()
    @IsString()
    mainLogo:string;
    
    @ApiProperty({
        type: Boolean,
        description: 'Indicates if the logo of the Company is a trademark (Registered at S.I.C.)'
    })
    @IsBoolean()
    logoIsRegistered:boolean;

    
    @ApiProperty({
        type: String,
        description: 'Name of the contact person of the Company'
    })
    @IsString()
    contactPersonName:string;
    
    @ApiProperty({
        type: String,
        description: 'Lastname of the contact person of the Company'
    })
    @IsString()
    contactPersonLastName:string;
    
    @ApiProperty({
        type: String,
        description: 'Email of the contact person of the Company'
    })
    @IsString()
    @IsEmail()
    contactPersonEmail:string;
    
    @ApiProperty({
        type: String,
        description: 'Password of the contact person of the Company'
    })
    @IsString()
    contactPersonPassword:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Phone of the contact person of the Company'
    })
    @IsOptional()
    @IsString()
    contactPersonPhone:string;
    
    @ApiProperty({
        type: String,
        description: 'Mobile phone of the contact person of the Company'
    })
    @IsString()
    contactPersonMobilePhone:string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'Website of the Company'
    })
    @IsOptional()
    @IsString()
    website:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Facebook username of the Company'
    })
    @IsOptional()
    @IsString()
    facebookUsername:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Instagram username of the Company'
    })
    @IsOptional()
    @IsString()
    instagramUsername:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'YouTube channel of the Company'
    })
    @IsOptional()
    @IsString()
    youtubeUsername:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'TikTok username of the Company'
    })
    @IsOptional()
    @IsString()
    tiktokUsername:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Twitter username of the Company'
    })
    @IsOptional()
    @IsString()
    twitterUsername:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'LinkedIn username of the Company'
    })
    @IsOptional()
    @IsString()
    linkedinUsername:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Pinterest username of the Company'
    })
    @IsOptional()
    @IsString()
    pinteresetUsername:string;    
}