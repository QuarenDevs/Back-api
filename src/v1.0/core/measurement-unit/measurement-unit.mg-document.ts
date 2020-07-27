import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';



@Schema({timestamps: true})
export class MeasurementUnit extends ExtendedDocument{

    @Prop()
    name: string;
    
    @Prop()
    symbol: string;
    
    @Prop()
    baseQuantity: string;
}

//export const schema = SchemaFactory.createForClass(MeasurementUnit);
export const schema = createSchema(MeasurementUnit);