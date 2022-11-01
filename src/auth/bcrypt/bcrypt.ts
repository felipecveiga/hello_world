import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'




Injectable()
export class Bcrypt{

async  criptografarSenha(senha: string): Promise<string>{

    let saltos: number = 10    //aqui significa que ele ira criar 10 numeros , o saltos ira criar mais 10 numeros para dificultar a criptografia
    return await bcrypt.hash(senha,saltos);  // aqui ele ira aguardar(await) o saltos criar os 10 numeros, e vai pegar senha e saltos, misturar para dificultar a criptografia, o saltos é apenas pra criar 10 numeros aleatorios para dificultar a criptografia
}

async compararSenha(senhaBanco: string, senhaDigitada: string): Promise<boolean>{

    return bcrypt.compareSync(senhaDigitada,senhaBanco); //aqui ele vai comparar a senha digitada com a senha do banco de dados e verificar se sao verdadeiro ou falso, por isso o boolean

}


}