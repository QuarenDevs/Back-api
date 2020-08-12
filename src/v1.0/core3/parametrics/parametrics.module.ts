import { Module } from '@nestjs/common';

import { CiiuSectionModule } from './ciiu-section/ciiu-section.module';

@Module({
    imports:[
        
        CiiuSectionModule
    ],
    controllers:[],
    providers:[]
})
export class ParametricsModule {}
