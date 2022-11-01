import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Usuario } from "../entities/usuario.entity";



@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt  // aqui ele vai fazer a conexao com a tabela auth que criamos
    ){}


        async findByUsuario(usuario:string): Promise <Usuario | undefined>{ // o undefined significa que ele precisa retornar um usuario existente

            return await this.usuarioRepository.findOne({

                where: {
                    usuario: usuario
                }

            })

}


async findAll(): Promise<Usuario[]> {

    return await this.usuarioRepository.find({

        relations: {
            postagem: true
        }
    })
}

async  findById (id: number ): Promise<Usuario>{

    let usuario = await this.usuarioRepository.findOne({
        where: {
            id
        },

        relations:{
            postagem: true
        }

       
    })

    if (!usuario)
    throw new HttpException('Usuario não existe', HttpStatus.NOT_FOUND)

return usuario
}

async create(usuario: Usuario): Promise<Usuario>{


    let buscarUsuario = await this.findByUsuario(usuario.usuario) //o usuario. usuario ele vai olhar dentro de usuario se nao tem email repetido, por isso ele olha dentro dele, o usuario é o email, ele so vai comparar os usuarios pra nao ter repetido
                                                                                    //a linha do let diz que a  variavel buscar usuario vai salvar as informaçoes de usuario e vai depois comparar o usuario.usario para nao ser duplicado.

    if (!buscarUsuario){
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario)
    }

    throw new HttpException('Usuario já cadastrado', HttpStatus.BAD_REQUEST)

}

async update(usuario: Usuario): Promise<Usuario>{
    let updateUsuario: Usuario = await this.findById(usuario.id)

    let buscarUsuario = await this.findByUsuario(usuario.usuario)

    if(!updateUsuario)
    throw new HttpException('Usuario não existe', HttpStatus.NOT_FOUND)

    if(buscarUsuario && buscarUsuario.id !== usuario.id) //se buscar usuario e buscar usuario.id for diferente de usuario id, ele retorna usuario ja cadastrado
    throw new HttpException('Usuario já cadastrado', HttpStatus.BAD_REQUEST)
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
    return await this.usuarioRepository.save(usuario)
}

}