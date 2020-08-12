import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { PurchaseOrderItem } from './purchase-order-item.mg-document';
import { CreatePurchaseOrderItem } from './dto/create-purchase-order-item.dto';
import { UpdatePurchaseOrderItem } from './dto/update-purchase-order-item.dto';
// Nested path imports
import { PurchaseOrderService } from '../../purchase-order.service';
import { PurchaseOrder } from '../../purchase-order.mg-document';


@Injectable()
export class PurchaseOrderItemService {

    serviceModel = 'PurchaseOrderItem';

    constructor(
        private purchaseOrderService: PurchaseOrderService,
        @InjectModel('PurchaseOrderItem') private purchaseOrderItemModel: ExtendedModel<PurchaseOrderItem>
        ){}
    
    async getAncestors(idPurchaseOrder:string, idPurchaseOrderItem = '' ):Promise<DocumentAncestor[]>
    {
        // Get all the ancestors
        const ancestors:DocumentAncestor[] = await this.purchaseOrderService.getAncestors(idPurchaseOrder);
        // Create the path for the current model collection (PurchaseOrderItem)
        ancestors[0].markModifiedPathCollection = `purchaseOrderItems`;

        // Get the data of the requested document, given its sid 
        if(idPurchaseOrderItem != '')
        {
            const purchaseOrder = ancestors[ancestors.length - 1].document as PurchaseOrder
            // Find the index by sid when the document is not deleted
            const foundIndex = purchaseOrder.purchaseOrderItems.findIndex(purchaseOrderItem => (purchaseOrderItem.sid == idPurchaseOrderItem) && (purchaseOrderItem.deletedAt == null));
            
            if( foundIndex < 0)
            {
                throw new HttpException(`Document of type ${this.serviceModel} and id ${idPurchaseOrderItem} was not found`, HttpStatus.NOT_FOUND);
            }
        
            // Create the path for the current model collection (PurchaseOrderItem)
            ancestors[0].markModifiedPathDocument = `${ancestors[0].markModifiedPathCollection}.${foundIndex}`;

            // Add the result to the response
            ancestors.push(new DocumentAncestor(purchaseOrder.purchaseOrderItems[foundIndex], foundIndex));
        }
        return ancestors;
    }

    async getPurchaseOrderItems(idPurchaseOrder:string): Promise<PurchaseOrderItem[]>
    {
        // Get the ancestors
        const ancestors = await this.getAncestors(idPurchaseOrder);
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as PurchaseOrder

        return parentDocument.purchaseOrderItems.filter(child => child.deletedAt == null);
    }

    async getPurchaseOrderItem(idPurchaseOrder:string, id: string): Promise<PurchaseOrderItem>
    {
        // Get the ancestors and the requested document
        const ancestors = await this.getAncestors(idPurchaseOrder, id);
        const foundPurchaseOrderItem = ancestors[ancestors.length - 1].document as PurchaseOrderItem;

        return foundPurchaseOrderItem;
    }

    async createPurchaseOrderItem(idPurchaseOrder:string, purchaseOrderItem: CreatePurchaseOrderItem):Promise<PurchaseOrderItem>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idPurchaseOrder)
        const documentOwner = ancestors[0].document as PurchaseOrder
        const parent = ancestors[ancestors.length - 1]
        const parentDocument = parent.document as PurchaseOrder

        // Create the new document
        const newObject = await this.purchaseOrderItemModel.createObject(purchaseOrderItem);
        parentDocument.purchaseOrderItems.push(newObject);
        
        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathCollection}`)
        const result = await documentOwner.save();
       
        return newObject;
    }
    
    async updatePurchaseOrderItem(idPurchaseOrder:string, id:string, purchaseOrderItem: UpdatePurchaseOrderItem):Promise<PurchaseOrderItem>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idPurchaseOrder, id);
        const documentOwner = ancestors[0].document as PurchaseOrder

        // Get the requested Document
        const foundPurchaseOrderItemAncestor = ancestors[ancestors.length - 1];
        const foundPurchaseOrderItem = foundPurchaseOrderItemAncestor.document as PurchaseOrderItem;

        // Update the Document
        Object.assign(foundPurchaseOrderItem, purchaseOrderItem);
        foundPurchaseOrderItem.updatedAt = new Date().toString();

        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundPurchaseOrderItem;
    }

    async deletePurchaseOrderItem(idPurchaseOrder:string, id:string):Promise<PurchaseOrderItem>
    {
        // Get the ancestors and document owner
        const ancestors = await this.getAncestors(idPurchaseOrder, id);
        const documentOwner = ancestors[0].document as PurchaseOrder

        // Get the requested Document
        const foundPurchaseOrderItemAncestor = ancestors[ancestors.length - 1];
        const foundPurchaseOrderItem = foundPurchaseOrderItemAncestor.document as PurchaseOrderItem;


        // Mark the found PurchaseOrderItem as deleted
        foundPurchaseOrderItem.updatedAt = new Date().toString();
        foundPurchaseOrderItem.deletedAt = foundPurchaseOrderItem.updatedAt;


        // Update the database
        documentOwner.markModified(`${ancestors[0].markModifiedPathDocument}`)
        const result = await documentOwner.save();

        return foundPurchaseOrderItem;
    }
}
