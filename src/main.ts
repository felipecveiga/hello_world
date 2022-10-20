import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { validate } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03:00';                  // fuso horario
  app.useGlobalPipes(new ValidationPipe())   //
  app.enableCors()                          // para que a gente consiga acessar o codigo de outros locais
  await app.listen(4000);                   // Porta que meu servidor vai rodar
}
bootstrap();
