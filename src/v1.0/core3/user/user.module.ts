import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { schema as UserSchema } from './user.mg-document';


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:'User', schema:UserSchema}
        ]),
        
    ],
    controllers:[UserController],
    providers:[
        UserService
    ]
})
export class UserModule {}
