import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';



@Schema({timestamps: true})
export class DocumentType extends ExtendedDocument{

    @Prop()
    name: string;
    
    @Prop()
    abbreviation: string;
    
}

//export const schema = SchemaFactory.createForClass(DocumentType);
export const schema = createSchema(DocumentType);