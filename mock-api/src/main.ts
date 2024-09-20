import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  if (!existsSync(join(__dirname, '..', 'public'))) {
    mkdirSync(join(__dirname, '..', 'public'));
  }
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = {}
        errors.forEach((error) => {
          result[error.property] = error.constraints[Object.keys(error.constraints)[0]]
        });
        result['status'] = "validation_errors"
        console.log(result);
        return new BadRequestException(result, 'validation_errors');
      },
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mock Api Dökümanı')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('help', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(3001);
}
bootstrap();
