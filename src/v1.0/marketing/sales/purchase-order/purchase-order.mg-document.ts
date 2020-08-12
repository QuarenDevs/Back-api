import { Schema, Prop } from '@nestjs/mongoose';
import { createSchema, ExtendedDocument } from 'modules/mongo/ExtendedMongo';

import { PurchaseOrderItem } from './nestedObjects/purchase-order-item/purchase-order-item.mg-document';

@Schema({timestamps: true})
export class PurchaseOrder extends ExtendedDocument{

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
    purchaseOrderItems: [PurchaseOrderItem]
}

//export const schema = SchemaFactory.createForClass(PurchaseOrder);
export const schema = createSchema(PurchaseOrder);