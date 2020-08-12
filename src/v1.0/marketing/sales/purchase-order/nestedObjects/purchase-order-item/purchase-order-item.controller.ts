import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseOrderItemService } from './purchase-order-item.service';
import { PurchaseOrderItem } from './purchase-order-item.mg-document';
import { CreatePurchaseOrderItem } from './dto/create-purchase-order-item.dto';
import { UpdatePurchaseOrderItem } from './dto/update-purchase-order-item.dto';

@ApiTags('Marketing / Sales / Purchase Order / Purchase Order Item')
@Controller('api/v1.0/purchase_orders/:idPurchaseOrder/purchase_order_items')
export class PurchaseOrderItemController {
    
    modelName = 'PurchaseOrderItem';

    constructor(private purchaseOrderItemService: PurchaseOrderItemService){}

    @Get()
    index(@Param('idPurchaseOrder') idPurchaseOrder:string): Promise<PurchaseOrderItem[]>  {
        return this.purchaseOrderItemService.getPurchaseOrderItems(idPurchaseOrder);
    }

    @Get(':id')
    show(@Param('idPurchaseOrder') idPurchaseOrder:string, @Param('id') id:string):Promise<PurchaseOrderItem>{
        return this.purchaseOrderItemService.getPurchaseOrderItem(idPurchaseOrder, id);
    }

    @Post()
    create(@Param('idPurchaseOrder') idPurchaseOrder:string, @Body() bodyParams: CreatePurchaseOrderItem):Promise<PurchaseOrderItem>{
        return this.purchaseOrderItemService.createPurchaseOrderItem(idPurchaseOrder, bodyParams);
    }

    
    @Put(':id')
    update(@Param('idPurchaseOrder') idPurchaseOrder:string, @Param('id') id:string, @Body() bodyParams: UpdatePurchaseOrderItem):Promise<PurchaseOrderItem>{
        return this.purchaseOrderItemService.updatePurchaseOrderItem(idPurchaseOrder, id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idPurchaseOrder') idPurchaseOrder:string, @Param('id') id:string):Promise<PurchaseOrderItem>{
        return this.purchaseOrderItemService.deletePurchaseOrderItem(idPurchaseOrder, id);
    }

    
    
}
