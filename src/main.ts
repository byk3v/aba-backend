import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();
const PORT = process.env.PORT || 3001; // asi funciona heroku
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  /*app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true,
      }
    ),
  );  npm i class-validator*/
  await app.listen(PORT);
}
bootstrap();
