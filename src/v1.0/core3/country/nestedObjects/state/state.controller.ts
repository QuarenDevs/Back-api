import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StateService } from './state.service';
import { State } from './state.mg-document';
import { CreateState } from './dto/create-state.dto';
import { UpdateState } from './dto/update-state.dto';

@ApiTags('Core3 / Country / State')
@Controller('api/v1.0/countries/:idCountry/states')
export class StateController {
    
    modelName = 'State';

    constructor(private stateService: StateService){}

    @Get()
    index(@Param('idCountry') idCountry:string): Promise<State[]>  {
        return this.stateService.getStates(idCountry);
    }

    @Get(':id')
    show(@Param('idCountry') idCountry:string, @Param('id') id:string):Promise<State>{
        return this.stateService.getState(idCountry, id);
    }

    @Post()
    create(@Param('idCountry') idCountry:string, @Body() bodyParams: CreateState):Promise<State>{
        return this.stateService.createState(idCountry, bodyParams);
    }

    
    @Put(':id')
    update(@Param('idCountry') idCountry:string, @Param('id') id:string, @Body() bodyParams: UpdateState):Promise<State>{
        return this.stateService.updateState(idCountry, id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('idCountry') idCountry:string, @Param('id') id:string):Promise<State>{
        return this.stateService.deleteState(idCountry, id);
    }

    
    
}
