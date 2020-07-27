import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { ExtendedModel } from 'modules/mongo/ExtendedMongo';
import { State } from './state.mg-document';
import { CreateState } from './dto/create-state.dto';
import { UpdateState } from './dto/update-state.dto';

@Injectable()
export class StateService {

    constructor(@InjectModel('State') private stateModel: ExtendedModel<State>){}

    async getStates(): Promise<State[]>
    {
        //return await this.stateModel.find();
        return await this.stateModel.getAll();
    }

    async getState(id: string): Promise<State>
    {
        //return await this.stateModel.findById(id);
        return await this.stateModel.findBySID(id);
    }

    async createState(state: CreateState):Promise<State>{
        const newObject = this.stateModel.store(state);
        
        return await newObject;
    }
    
    async updateState(id:string, state: UpdateState):Promise<State>{
        const updatedObject = await this.stateModel.updateBySID(id, state);
        
        return updatedObject;
    }

    async deleteState(id:string):Promise<State>{
        // const deletedObject = await this.stateModel.findOneAndUpdate({_id: id}, {deleted_at:Date.now()}, {new: true});
        const deletedObject = await this.stateModel.softDelete(id);
        
        return deletedObject;
    }
}
