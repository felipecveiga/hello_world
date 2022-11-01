//cria nossa tabela com nosssos atributos.

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entities";

@Entity({name:"tb_temas"})
export class Tema {                                      //significa que o nome de classe sempre com a 1 letra maiuscula
    
    @PrimaryGeneratedColumn()
    @ApiProperty()

    id: number
    @IsNotEmpty ()                                      //significa que  nao pode ser vazio
    @Column({length: 255, nullable: false})
    @ApiProperty()
    descricao: string

    @ApiProperty({type: () => Postagem})
    @OneToMany(()  => Postagem, (Postagem) => Postagem.tema)
    postagem: Postagem[] 


}                   