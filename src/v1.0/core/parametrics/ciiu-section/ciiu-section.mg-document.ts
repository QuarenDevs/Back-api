import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';

import { CiiuDivision } from './nestedObjects/ciiu-division/ciiu-division.mg-document';

@Schema({timestamps: true})
export class CiiuSection extends ExtendedDocument{

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
    ciiuDivisions: [CiiuDivision]
}

//export const schema = SchemaFactory.createForClass(CiiuSection);
export const schema = createSchema(CiiuSection);