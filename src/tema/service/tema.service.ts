import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()                                                   //toda essa tabela(tema.service) pode ser acessada de qualquer lugar.
export class TemaService {
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>                // o repository é como se fosse uma classe de tema que tbm pode ser acessada de qualquer lugar de tema service
    ) { }


    //Get All                                                       // é para puxar uma informação de dentro do banco de dados 
    async findAll(): Promise<Tema[]> {                              // O findAll faz a busca especifica de todo tema, nesse caso ele faz a busca especifica de todos os tema, especificado no Promise<tema>


        return await this.temaRepository.find({                    //o await ele é a função espera que vai esperar a linha de cima acontecer, //aqui ele vai retornar todo repositorio de tema, repositorio é tudo que esta em injectable e injectrepository
            relations: {
                postagem: true
            }
        });  


    }
    
    //Get ID
    async findById(id: number): Promise <Tema> {

            let tema = await this.temaRepository.findOne({          //findOne é para retornar somento um ID especifico, em sua busca.

                where: {                                            //o where ele vai dizer em qual coluna esta o ID, vai dizer onde se encontra o ID.
                    id
                },
                relations: {
                    postagem: true
                }
            })
            
            
            if (!tema)                                                                // o ! significa vazio,ou seja, se o tema for vazio ele retorno tema nao existe
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)         //o throw significa lancar, ou seja, ele vai  lancar uma nova mensagem que o tema nao existe caso o tema seja vazio
            
            return tema
        }
        //Get Descriçãp
        async findByDescricao(descricao: string): Promise<Tema[]>{
            return await this.temaRepository.find({
                where:{
                    descricao: ILike(`%${descricao} %`)         
                },
                relations:{
                    postagem: true
                }
            })
        }


        //Post
        async create(tema: Tema): Promise<Tema>{                //o async é para continuar rodando em segundo plano, o async é para sempre ta funcionando.

            return await this.temaRepository.save(tema)         //ele vai criar o tema e vai retornar o repositorio e salvar o tema 
        } 


        //Put
        async  update(tema: Tema): Promise<Tema>{       
            let buscarTema = await this.findById(tema.id)           //o let ta criando uma variavel buscarTema e ele atrbibui que aguardeo id desse tema.

        
            if (!buscarTema || !buscarTema.id)                      //se buscarTema estiver vazio OU tema.id estiver vazio, ele vai retornar tema nao existe, //o ! significa vazio, entao esse codigo lê, se buscarTema for vazio ele retorna , tema nao existe
    
                throw new HttpException('tema não existe', HttpStatus.NOT_FOUND)
        
                return await this.temaRepository.save(tema)         // se o tema for achado ele salva
        }

        async delete (id: number): Promise<DeleteResult>{
            let buscarTema = await this.findById(id)
            if(!buscarTema)
            throw  new HttpException('tema nao encontrada', HttpStatus.NOT_FOUND)
            return await this.temaRepository.delete(id)
        }

    }


    
//o service puxa os dados do entities que são as tabelas.