import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.allowedOrigin,
    }
  });
  const config = new DocumentBuilder()
    .setTitle('Oxxo API')
    .setDescription('API for Oxxo management')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(4000);
}
bootstrap();



//Swagger nos permite documentar nuestra API de una manera sencilla y rápida.
//OpenAPI es una especificación para describir APIs RESTful, que se basa en el formato JSON.
//Lo podemos usar para documentar nuestras APIs, y también para generar código de cliente y servidor.