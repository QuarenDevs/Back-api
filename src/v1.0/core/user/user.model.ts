import { ExtendedModel, ExtendedDocument } from "modules/mongo";

export interface UserModel<T extends ExtendedDocument> extends ExtendedModel<T>
{
    generatePDF(sid:string) : Promise<T>;
    
}