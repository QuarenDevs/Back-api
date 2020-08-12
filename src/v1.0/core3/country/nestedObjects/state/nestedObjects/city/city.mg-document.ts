import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';

import { Borough } from './nestedObjects/borough/borough.mg-document';

@Schema({timestamps: true})
export class City extends ExtendedDocument{

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
    
    //@Prop()
    //presentations:[Presentation],
    
    @Prop()
    initialDate: string;
    
    @Prop()
    isVisible: boolean;

    @Prop()
    boroughs: [Borough]
}

//export const schema = SchemaFactory.createForClass(City);
export const schema = createSchema(City);