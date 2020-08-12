import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrderItemController } from './purchase-order-item.controller';
import { PurchaseOrderService } from '../../purchase-order.service';
import { schema as PurchaseOrderSchema } from '../../purchase-order.mg-document';
import { PurchaseOrderItemService } from './purchase-order-item.service';
import { schema as PurchaseOrderItemSchema } from './purchase-order-item.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'PurchaseOrder', schema:PurchaseOrderSchema}
        ]),
		MongooseModule.forFeature([
            {name:'PurchaseOrderItem', schema:PurchaseOrderItemSchema}
        ]),
        
    ],
    controllers:[PurchaseOrderItemController],
    providers:[
        PurchaseOrderService,
		PurchaseOrderItemService
    ]
})
export class PurchaseOrderItemModule {}
