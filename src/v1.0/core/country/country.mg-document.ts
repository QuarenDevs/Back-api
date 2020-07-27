import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';

import { State } from './nestedObjects/state/state.mg-document';

@Schema({timestamps: true})
export class Country extends ExtendedDocument{

    @Prop()
    name: string;
    
    @Prop()
    callingCode: number;
    
    @Prop()
    states: [State]
}

//export const schema = SchemaFactory.createForClass(Country);
export const schema = createSchema(Country);