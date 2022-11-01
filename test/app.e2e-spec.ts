import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {TypeOrmModule} from '@nestjs/typeorm'; // é a importação do nosso banco de dados, o typeorm conecta com nosso banco de dados

describe('Teste de Modules Usuarios e Auth(e2e)', () => {


  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
       type: 'mysql',
       host: 'localhost' ,
       port: 3306,
       username: 'root',
       password: 'root',
       database: 'db_blogpessoal_test',
       autoLoadEntities: true,
       synchronize: true,
       logging: false,
       dropSchema: true     //ele consegue manipular nossa tabela, modificar, excluir.

      }),
      
      AppModule],

    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {


    await app.close()
  } )



it('01 - Cadastrar Usuario', async () => {

const resposta = await request (app.getHttpServer()) // criei uma variavel que ela vai ser resposta e ela vai aguadar a resposta para me retornar o app.gethttpserver
.post('/usuarios/cadastrar')
.send({
  nome: 'Root',
  usuario: 'root@root.com',
  senha: 'rootroot',
  foto: ''
});

expect (201); // aqui é que queremos que o retorno seja o 201
usuarioId = resposta.body.id 

})

it('02 - deve autenticar usuario (login)', async() => {

 const resposta = await request (app.getHttpServer())
 .post('/auth/logar') //rota
 .send({
  usuario: 'root@root.com',
  senha: 'rootroot',

 });

 expect(200)
 token = resposta.body.token

})

it('03 - não deve duplicar usuario', async() => {
  return request (app.getHttpServer())
  .post('/usuarios/cadastrar')  //rota
  .send({
   nome: 'Root',
   usuario:'root@root.com',
   senha: 'rootroot',
   foto:''
  })

  .expect(400)  //acima do erro 300 coloca o .expect


})

it('04 - deve listar todos usuarios', async() => {
  return request(app.getHttpServer())
  .get('/usuarios/all')
  .set('Authorization', `${token}`)
  .send({})  //ele envia o corpo de uma requisição, mas como ele ta vazio nao envia nada.
  .expect(200) //como ele ta dentro da função que sao as {}, usa o .expect


})

it('05 - deve atualizar os usuarios', async() => {
  return request(app.getHttpServer())
  .put('/usuarios/atualizar')   //rota
  .set('Authorization', `${token}`)
  .send({
    id: usuarioId,
    nome: 'Jorginho',
    usuario: 'jorginho@gmail.com',
    senha: 'rootroot',
    foto: ''

  })
  .expect(200)
  .then(resposta => {
    expect("Jorginho").toEqual(resposta.body.nome)
  })

})
});

