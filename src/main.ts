import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //VALIDATION PIPES - DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //GLOBAL PREFIX
  app.setGlobalPrefix('api/v1');

  //CORS CONFIG
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001'],
  });

  await app.listen(3000);
}
bootstrap();
