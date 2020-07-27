import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';
import { HttpException, HttpStatus } from '@nestjs/common';



@Schema({timestamps: true})
export class User extends ExtendedDocument{

    @Prop()
    name: string;
    
    @Prop()
    lastname: string;
    
    @Prop()
    email: string;
    
    @Prop()
    birthday: string;
    
    @Prop()
    documentNumber: string;

    
}

//export const schema = SchemaFactory.createForClass(User);
export const schema = createSchema(User);

schema.statics.generatePDF = async function (sid: string): Promise<Array<User>> {
    console.log("sa GENERATE PDF")
    throw new HttpException(`GENERANDO PDF del id ${sid}`, HttpStatus.NOT_FOUND);
        
};