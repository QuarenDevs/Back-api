import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsInt, IsOptional, IsBoolean, IsDate, IsEmail } from 'class-validator';

export class UpdateCompany{

    
    @ApiPropertyOptional({
        type: String,
        description: 'CIIU Section of the Company'
    })
    @IsOptional()
    @IsString()
    ciiuSection:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'CIIU Division of the Company'
    })
    @IsOptional()
    @IsString()
    ciiuDivision:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'CIIU Group of the Company'
    })
    @IsOptional()
    @IsString()
    ciiuGroup:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'CIIU Class of the Company'
    })
    @IsOptional()
    @IsString()
    ciiuClass:string;

    @ApiPropertyOptional({
        type: String,
        description: 'Name of the Company'
    })
    @IsOptional()
    @IsString()
    name: string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Document number of the Company'
    })
    @IsOptional()
    @IsString()
    documentNumber: string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Document type of the Company'
    })
    @IsOptional()
    @IsString()
    documentType: string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Short description of the Company'
    })
    @IsOptional()
    @IsString()
    shortDescription:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Full description of the Company'
    })
    @IsOptional()
    @IsString()
    fullDescription:string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'Foundation date of the Company'
    })
    @IsOptional()
    @IsDate()
    foundationDate:string;

    
    @ApiPropertyOptional({
        type: String,
        description: 'URL of the logo of the Company'
    })
    @IsOptional()
    @IsString()
    mainLogo:string;
    
    @ApiPropertyOptional({
        type: Boolean,
        description: 'Indicates if the logo of the Company is a trademark (Registered at S.I.C.)'
    })
    @IsOptional()
    @IsBoolean()
    logoIsRegistered:boolean;

    
    @ApiPropertyOptional({
        type: String,
        description: 'Name of the contact person of the Company'
    })
    @IsOptional()
    @IsString()
    contactPersonName:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Lastname of the contact person of the Company'
    })
    @IsOptional()
    @IsString()
    contactPersonLastName:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Email of the contact person of the Company'
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    contactPersonEmail:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Password of the contact person of the Company'
    })
    @IsOptional()
    @IsString()
    contactPersonPassword:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Phone of the contact person of the Company'
    })
    @IsOptional()
    @IsString()
    contactPersonPhone:string;
    
    @ApiPropertyOptional({
        type: String,
        description: 'Mobile phone of the contact person of the Company'
    })
    @IsOptional()
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