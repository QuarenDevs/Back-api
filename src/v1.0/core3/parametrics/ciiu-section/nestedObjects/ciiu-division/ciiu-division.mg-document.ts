import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';

import { CiiuGroup } from './nestedObjects/ciiu-group/ciiu-group.mg-document';

@Schema({timestamps: true})
export class CiiuDivision extends ExtendedDocument{

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
    ciiuGroups: [CiiuGroup]

    @Prop([CiiuGroup])
    ciiuNestedGroups: [CiiuGroup]
}

//export const schema = SchemaFactory.createForClass(CiiuDivision);
export const schema = createSchema(CiiuDivision);