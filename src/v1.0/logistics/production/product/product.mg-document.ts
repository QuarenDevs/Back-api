import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { Presentation } from '../presentation/presentation.mg-document';
import { SchemaTypes } from 'mongoose';



@Schema({timestamps: true})
export class Product extends ExtendedDocument{

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

    @Prop([{type: SchemaTypes.ObjectId, ref: 'Presentation'}])
    presentations:[string];
    

}

//export const schema = SchemaFactory.createForClass(Product);
export const schema = createSchema(Product);