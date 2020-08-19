import { Model, Document, Schema, SchemaTypes, Types} from "mongoose";
import { SchemaFactory, Prop } from "@nestjs/mongoose";
import { Type, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { generate as generateSID } from 'shortid';
//import { User } from "src/v1.0/core2/user/user.mg-document";

export interface ExtendedModel<T extends Document> extends Model<T>
{
    
    getAll() : Promise<T[]>;
    findBySID(sid:string) : Promise<T>;
    createObject(dto:any) : T;
    store(dto:any) : Promise<T>;
    updateBySID(sid:string, dto:any): Promise<T>;
    softDelete(sid:string) : Promise<T>;

    getAllNested<N>(relationship:string) : Promise<N[]>;
    findNestedBySID<N>(relationship:string, sid:string) : Promise<N>;
    storeNested<N>(relationship:string, dto:any) : Promise<N>;
    updateNestedBySID<N>(relationship:string, sid:string, dto:any): Promise<N>;
    softDeleteNested<N>(relationship:string, sid:string) : Promise<N>;
}

export function createSchema(mgDocument:Type<unknown>) :Schema{
    const schema = SchemaFactory.createForClass(mgDocument);
     
    let createdBy:any = { type: SchemaTypes.ObjectId, default:null }

    if(mgDocument.name != 'User')
    {
        // import { User } from "src/v1.0/core2/user/user.mg-document";
        // createdBy = { type: SchemaTypes.ObjectId, ref: User,  default:null }
    }
    
    schema.add({
      sid: {type: String, default: null},
      createdBy:createdBy,//{ type: SchemaTypes.ObjectId, default:null },
      isActive: {type: Boolean, default: true},
      createdAt: {type: String, default: new Date().toString()},
      updatedAt: {type: String, default: new Date().toString()},
      deletedAt: {type: String, default: null},
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
    schema.statics.createObject = function(dto:any): Type<unknown>{
        dto.sid = generateSID();
        const newObject = new this(dto);
        return newObject;
    }
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


    // NESTED CRUD
    schema.statics.getAllNested = async function<N> (relationship:string) : Promise<N[]>{
        console.log(this);
        console.log(relationship);
        return this[relationship];
    }
    /*
    schema.statics.findNestedBySID = async function<N> (relationship:string, sid:string) : Promise<N>{
        
    }
    schema.statics.storeNested = async function<N> (relationship:string, dto:any) : Promise<N>{
        
    }
    schema.statics.updateNestedBySID = async function<N> (relationship:string, sid:string, dto:any): Promise<N>{
        
    }
    schema.statics.softDeleteNested = async function<N> (relationship:string, sid:string) : Promise<N>{
        
    }


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

    @Prop()
    sid: string;

    @Prop()
    updatedAt:string
    
    @Prop()
    deletedAt: string;

    @Prop({type:String, default:"hdjkashdjash"})
    createdBy: string;

    @Prop()
    minimumDay: number;

    @Prop({type:Number, default:156})
    otherField: number;

    updateNestedDocument(newData:any){
        Logger.warn(newData)
        Logger.warn("===========")
        Logger.warn(this)
    }
    
}

export class ExtendedSubdocument extends Types.Subdocument{
    @Prop()
    id?: string;

    @Prop({type: String, default:generateSID()})
    sid: string;

    createdBy: string;
    
    deletedAt: string;
}

export class DocumentAncestor{
    markModifiedPathCollection:string; 
    markModifiedPathDocument:string; 
    constructor(public document: ExtendedDocument, public documentIndex = -1){

    }
}