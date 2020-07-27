import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.mg-document';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@ApiTags('Core / User')
@Controller('api/v1.0/users')
export class UserController {
    
    modelName = 'User';

    constructor(private userService: UserService){}

    @Get()
    index(): Promise<User[]>  {
        return this.userService.getUsers();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<User>{
        return this.userService.getUser(id);
    }

    @Post()
    create(@Body() bodyParams: CreateUser):Promise<User>{
        return this.userService.createUser(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateUser):Promise<User>{
        return this.userService.updateUser(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<User>{
        return this.userService.deleteUser(id);
    }

    
    
}
