import { Schema, Prop } from '@nestjs/mongoose';

import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { SchemaTypes} from 'mongoose';



@Schema({timestamps: true})
export class Presentation extends ExtendedDocument{

    @Prop()
    slug: string;

    @Prop()
    formal_name: string;

    @Prop()
    short_name: string;
    
    @Prop()
    description: string;
    
    @Prop({type:SchemaTypes.ObjectId, ref:'Product'})
    product: string;

    @Prop()
    measurement_quantity: number;
    
    @Prop()
    measurement_unit: string;

    @Prop()
    minimum_stock_quantity: number;

    @Prop()
    sku: string;

    @Prop()
    barcode: string;

    @Prop()
    image: string;
    
    @Prop()
    available_since: string;
    
    @Prop()
    isVisible: boolean;

    
}

//export const schema = SchemaFactory.createForClass(Presentation);
export const schema = createSchema(Presentation);