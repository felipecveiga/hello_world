import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')   // titulo
  .setDescription('Projeto do blog pessoal')    //descriçao
  .setContact('Generation brasil', 'www.genbr.com.br', 'fcosta.veiga@gmail.com')    //contato
  .setVersion('1.0')      //versao
  .addBearerAuth()    //é um recurso utilizado para garantir a segurança durante a utilização da API. Ele é gerado na autenticação do usuário e será solicitado diversas vezes durante seu uso da API, ou seja, ele é um token temporario de segurança
  .build()
  const document = SwaggerModule.createDocument(app, config) //ele vai criar um document com os dados de app e config
  SwaggerModule.setup('/swagger', app, document)    //rota

  process.env.TZ = '-03:00';                  // fuso horario
  app.useGlobalPipes(new ValidationPipe())   //
  app.enableCors()                          // para que a gente consiga acessar o codigo de outros locais
  await app.listen(process.env.PORT || 4000);                   // Porta que meu servidor vai rodar
}
bootstrap();
