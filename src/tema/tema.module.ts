import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { temaController } from "./controller/tema.controller";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./service/tema.service";

@Module({
imports: [TypeOrmModule.forFeature([Tema])],
providers:[TemaService],
controllers:[temaController],
exports:[TypeOrmModule],

})

export class TemaModule { }

//o TEMA.MODULE ele compila as informaçoes da tabela dentro do database, puxando os dados de controller, entities e service.