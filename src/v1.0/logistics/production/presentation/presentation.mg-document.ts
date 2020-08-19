import { Schema, Prop } from '@nestjs/mongoose';

import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { Product } from '../product/product.mg-document';
import { SchemaTypes} from 'mongoose';



@Schema({timestamps: true})
export class Presentation extends ExtendedDocument{

    // @Prop()
    // id?: string;

    // @Prop({type: String, default:generateSID()})
    // sid: string;

    @Prop()
    name: string;
    
    @Prop()
    year: number;
    
    @Prop()
    value: number;
    
    @Prop({type:SchemaTypes.ObjectId, ref:'Product'})
    product: string;
    
    @Prop()
    initialDate: string;
    
    @Prop()
    isVisible: boolean;

    
}

//export const schema = SchemaFactory.createForClass(Presentation);
export const schema = createSchema(Presentation);