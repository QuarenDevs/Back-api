import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrder } from './purchase-order.mg-document';
import { CreatePurchaseOrder } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrder } from './dto/update-purchase-order.dto';

@ApiTags('Marketing / Sales / Purchase Order')
@Controller('api/v1.0/purchase_orders')
export class PurchaseOrderController {
    
    modelName = 'PurchaseOrder';

    constructor(private purchaseOrderService: PurchaseOrderService){}

    @Get()
    index(): Promise<PurchaseOrder[]>  {
        return this.purchaseOrderService.getPurchaseOrders();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<PurchaseOrder>{
        return this.purchaseOrderService.getPurchaseOrder(id);
    }

    @Post()
    create(@Body() bodyParams: CreatePurchaseOrder):Promise<PurchaseOrder>{
        return this.purchaseOrderService.createPurchaseOrder(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdatePurchaseOrder):Promise<PurchaseOrder>{
        return this.purchaseOrderService.updatePurchaseOrder(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<PurchaseOrder>{
        return this.purchaseOrderService.deletePurchaseOrder(id);
    }

    
    
}
