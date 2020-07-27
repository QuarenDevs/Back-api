import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './user.mg-document';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'User', schema:schema}
        ]),
        
    ],
    controllers:[UserController],
    providers:[UserService]
})
export class UserModule {}
