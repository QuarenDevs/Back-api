import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtendedModel, DocumentAncestor } from 'modules/mongo/ExtendedMongo';
import { User } from './user.mg-document';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: ExtendedModel<User>)
    {}
    
    async getAncestors(idUser:string ):Promise<DocumentAncestor[]>
    {
        const user = await this.userModel.findBySID(idUser);
        const ancestors:DocumentAncestor[] = [new DocumentAncestor(user)];
        return ancestors;
    }

    async getUsers(): Promise<User[]>
    {
        return await this.userModel.getAll();
    }

    async getUser(id: string): Promise<User>
    {
        return await this.userModel.findBySID(id);
    }

    async createUser(user: CreateUser):Promise<User>
    {
        const newObject = this.userModel.store(user);    
        return await newObject;
    }
    
    async updateUser(id:string, user: UpdateUser):Promise<User>
    {
        const updatedObject = await this.userModel.updateBySID(id, user);    
        return updatedObject;
    }

    async deleteUser(id:string):Promise<User>
    {
        const deletedObject = await this.userModel.softDelete(id);    
        return deletedObject;
    }
}
