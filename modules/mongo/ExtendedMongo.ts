import { Model, Document, Schema, SchemaTypes } from "mongoose";
import { SchemaFactory, Prop } from "@nestjs/mongoose";
import { Type, HttpException, HttpStatus } from '@nestjs/common';
import { generate as generateSID } from 'shortid';
//import { User } from "src/v1.0/core2/user/user.mg-document";

export interface ExtendedModel<T extends Document> extends Model<T>
{
    getAll() : Promise<T[]>;
    findBySID(sid:string) : Promise<T>;
    store(dto:any) : Promise<T>;
    updateBySID(sid:string, dto:any): Promise<T>;
    softDelete(sid:string) : Promise<T>;
}

export function createSchema(mgDocument:Type<unknown>) :Schema{
    //mgDocument.apply(this, {addedAtt:{type:String, default:"SSDDD"}});
    const schema = SchemaFactory.createForClass(mgDocument);

    
    // schema. = extend(schema, {
    //     firstname: {type: String, default:"AAAA"},
    //     lastname: {type: String, default:"AAAA"},
    //     phone: {type: String, default:"AAAA"}
    //   });
      
    //schema.obj['extraField'] = {type: String, default: "AAA"};
     
    let createdBy:any = { type: SchemaTypes.ObjectId, default:null }

    if(mgDocument.name != 'User')
    {
        // import { User } from "src/v1.0/core2/user/user.mg-document";
        // createdBy = { type: SchemaTypes.ObjectId, ref: User,  default:null }
    }
    
    schema.add({
      sid: {type: String, default: null},
      createdBy:createdBy,//{ type: SchemaTypes.ObjectId, default:null },
      deletedAt: {type: String, default: null}
    })

    schema.statics.getAll = async function (): Promise<Array<Type<unknown>>> {
        console.log("buscando por sid desde Extended Model")
        return this.find({ deletedAt: null })
    };
    schema.statics.findBySID = async function (sid: string): Promise<Array<Type<unknown>>> {
        const foundDocument = await this.findOne({ sid: sid, deletedAt: null })
            if(!foundDocument)
        {
            throw new HttpException(`Document of type ${mgDocument.name} and id ${sid} was not found`, HttpStatus.NOT_FOUND);
        }
        return foundDocument;
    };
    schema.statics.store = async function(dto:any): Promise<Type<unknown>>{
        dto.sid = generateSID();
        const newObject = new this(dto);
        
        return await newObject.save();
    }
    schema.statics.updateBySID = async function (sid: string, dto:any): Promise<Array<Type<unknown>>> {
        const updatedObject = await this.findOneAndUpdate({sid: sid, deletedAt:null}, dto, {new: true});
            if(!updatedObject)
        {
            throw new HttpException(`Document of type ${mgDocument.name} and id ${sid} was not found`, HttpStatus.NOT_FOUND);
        }
        return updatedObject;
    };
    schema.statics.softDelete = async function (sid: string): Promise<Array<Type<unknown>>> {
        console.log("Soft Delete por sid desde Extended Model")
        return  await this.findOneAndUpdate({sid: sid}, {deletedAt: new Date().toISOString()}, {new: true});
            
    };

    /*
    schema.pre('save', function(next) {
        if(this.sid == undefined || this.sid)
        {
            
        }
        next();
    });
    */
    return schema;
}

/**
 *  Extended document
 */
export class ExtendedDocument extends Document{

    @Prop()
    id?: string;

    @Prop({type: String, default:generateSID()})
    sid: string;

    createdBy: string;
    
    deletedAt: string;
    
}