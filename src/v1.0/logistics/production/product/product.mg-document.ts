import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { Presentation } from '../presentation/presentation.mg-document';
import { SchemaTypes } from 'mongoose';



@Schema({timestamps: true})
export class Product extends ExtendedDocument{

    @Prop({type:SchemaTypes.ObjectId, ref:'Company'})
    ownerCompany: string;

    @Prop()
    slug: string;

    @Prop()
    name: string;
    
    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop([{type: SchemaTypes.ObjectId, ref: 'Presentation'}])
    presentations:[Presentation];
    

}

//export const schema = SchemaFactory.createForClass(Product);
export const schema = createSchema(Product);