import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';



@Schema({timestamps: true})
export class DocumentType extends ExtendedDocument{

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

    
}

//export const schema = SchemaFactory.createForClass(DocumentType);
export const schema = createSchema(DocumentType);