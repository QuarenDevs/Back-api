import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { PurchaseOrder } from './purchase-order.mg-document';
import { CreatePurchaseOrder } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrder } from './dto/update-purchase-order.dto';

@Injectable()
export class PurchaseOrderService {

    constructor(@InjectModel('PurchaseOrder') private purchaseOrderModel: ExtendedModel<PurchaseOrder>)
    {}
    
    async getAncestors(idPurchaseOrder:string ):Promise<DocumentAncestor[]>
    {
        const purchaseOrder = await this.purchaseOrderModel.findBySID(idPurchaseOrder);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(purchaseOrder)];
        return ancestors;
    }

    async getPurchaseOrders(): Promise<PurchaseOrder[]>
    {
        return await this.purchaseOrderModel.getAll();
    }

    async getPurchaseOrder(id: string): Promise<PurchaseOrder>
    {
        return await this.purchaseOrderModel.findBySID(id);
    }

    async createPurchaseOrder(purchaseOrder: CreatePurchaseOrder):Promise<PurchaseOrder>
    {
        const newObject = this.purchaseOrderModel.store(purchaseOrder);    
        return await newObject;
    }
    
    async updatePurchaseOrder(id:string, purchaseOrder: UpdatePurchaseOrder):Promise<PurchaseOrder>
    {
        const updatedObject = await this.purchaseOrderModel.updateBySID(id, purchaseOrder);    
        return updatedObject;
    }

    async deletePurchaseOrder(id:string):Promise<PurchaseOrder>
    {
        const deletedObject = await this.purchaseOrderModel.softDelete(id);    
        return deletedObject;
    }
}
