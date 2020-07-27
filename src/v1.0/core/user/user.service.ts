import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { User } from './user.mg-document';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: UserModel<User>){}

    async getUsers(): Promise<User[]>
    {
        //return await this.userModel.find();
        return await this.userModel.getAll();
    }

    async getUser(id: string): Promise<User>
    {
        //return await this.userModel.findById(id);
        return await this.userModel.findBySID(id);
    }

    async createUser(user: CreateUser):Promise<User>{
        const newObject = this.userModel.store(user);
        
        return await newObject;
    }
    
    async updateUser(id:string, user: UpdateUser):Promise<User>{
        const updatedObject = await this.userModel.updateBySID(id, user);
        
        return updatedObject;
    }

    async deleteUser(id:string):Promise<User>{
        // const deletedObject = await this.userModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.userModel.softDelete(id);
        
        return deletedObject;
    }

    async generatePDF(id:string):Promise<User>
    {
        return await this.userModel.generatePDF(id);
    }
}
