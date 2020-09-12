import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { SchemaTypes } from 'mongoose';
import { Product } from 'src/v1.0/logistics/production/product/product.mg-document';



@Schema({timestamps: true})
export class Company extends ExtendedDocument{
    
    @Prop()
    ciiuSection:string;
    
    @Prop()
    ciiuDivision:string;
    
    @Prop()
    ciiuGroup:string;
    
    @Prop()
    ciiuClass:string;

    @Prop()
    name: string;
    
    @Prop()
    documentNumber: string;
    
    @Prop()
    documentType: string;
    
    @Prop()
    shortDescription:string;
    
    @Prop()
    fullDescription:string;

    
    @Prop()
    foundationDate:string;

    
    @Prop()
    mainLogo:string;
    
    @Prop()
    logoIsRegistered:boolean;

    
    @Prop()
    contactPersonName:string;
    
    @Prop()
    contactPersonLastName:string;
    
    @Prop()
    contactPersonEmail:string;
    
    @Prop()
    contactPersonPassword:string;
    
    @Prop()
    contactPersonPhone:string;
    
    @Prop()
    contactPersonMobilePhone:string;

    
    @Prop()
    website:string;
    
    @Prop()
    facebookUsername:string;
    
    @Prop()
    instagramUsername:string;
    
    @Prop()
    youtubeUsername:string;
    
    @Prop()
    tiktokUsername:string;
    
    @Prop()
    twitterUsername:string;
    
    @Prop()
    linkedinUsername:string;
    
    @Prop()
    pinteresetUsername:string;

    
    @Prop([{type: SchemaTypes.ObjectId, ref: 'Product'}])
    products:[Product];
    
}

export const schema = createSchema(Company);