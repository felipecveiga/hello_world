//cria nossa tabela com nosssos atributos.

import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tb_temas"})
export class Tema {                                      //significa que o nome de classe sempre com a 1 letra maiuscula
    
    @PrimaryGeneratedColumn()

    id: number
    @IsNotEmpty ()                                      //significa que  nao pode ser vazio
    @Column({length: 255, nullable: false})
    descricao: string


    @OneToMany(()  => Postagem, (Postagem) => Postagem.tema)
    postagem: Postagem[] 


}                   