import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port:number = parseInt(process.env.PORT) || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
      .setTitle('App de emprendimiento API')
      .setDescription('API de la app de emprendimiento organizada por módulos funcionales de las empresas')
      .setVersion('1.0')
      .build();
  
  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, doc);


  // Validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`Server is ready on http://localhost:${port}`)
}
bootstrap();
