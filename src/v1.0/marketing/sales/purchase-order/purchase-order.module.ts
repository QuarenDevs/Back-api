import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './purchase-order.service';
import { schema as PurchaseOrderSchema } from './purchase-order.mg-document';
import { PurchaseOrderItemModule } from './nestedObjects/purchase-order-item/purchase-order-item.module';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'PurchaseOrder', schema:PurchaseOrderSchema}
        ]),
        PurchaseOrderItemModule
    ],
    controllers:[PurchaseOrderController],
    providers:[
        PurchaseOrderService
    ]
})
export class PurchaseOrderModule {}
