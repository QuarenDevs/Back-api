import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { V_1_0_Module } from './v1.0/v1.0.module';
 
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_PATH, {useFindAndModify:false}),
    V_1_0_Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
