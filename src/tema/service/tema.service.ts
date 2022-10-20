import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {

        return await this.temaRepository.find({                    //o await ele é a função espera que vai esperar a linha de cima acontecer
            relations: {
                postagem: true
            }
        });  


    }
    

    async findById(id: number): Promise <Tema> {

            let tema = await this.temaRepository.findOne({

                where: {
                    id
                },
                relations: {
                    postagem: true
                }
            })
            
            
            if (!tema)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
            
            return tema
        }

        async findByDescricao(descricao: string): Promise<Tema[]>{
            return await this.temaRepository.find({
                where:{
                    descricao: ILike(`%${descricao} %`)         //o ilike busca exatamente o titulo.
                },
                relations:{
                    postagem: true
                }
            })
        }

        async create(tema: Tema): Promise<Tema>{                //o async é para continuar rodando em segundo plano.

            return await this.temaRepository.save(tema)
        } 

        async  update(tema: Tema): Promise<Tema>{
            let buscarTema = await this.findById(tema.id)
        
            if (!buscarTema || !buscarTema.id)
                throw new HttpException('tema não existe', HttpStatus.NOT_FOUND)
        
                return await this.temaRepository.save(tema)
        }

        async delete (id: number): Promise<DeleteResult>{
            let buscarTema = await this.findById(id)
            if(!buscarTema)
            throw  new HttpException('tema nao encontrada', HttpStatus.NOT_FOUND)
            return await this.temaRepository.delete(id)
        }

    }


    
