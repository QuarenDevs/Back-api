import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';

import { City } from './nestedObjects/city/city.mg-document';

@Schema({timestamps: true})
export class State extends ExtendedDocument{

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
    cities: [City]
}

//export const schema = SchemaFactory.createForClass(State);
export const schema = createSchema(State);