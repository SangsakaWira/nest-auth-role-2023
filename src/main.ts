import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { urlencoded, json } from 'express';
import {TransformInterceptor} from './utils/decorators/transform.interceptor'
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
