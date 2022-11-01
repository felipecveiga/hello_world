//ela gerencia nossa rota do service.

import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../service/auth.service";


@ApiTags('Usuarios')
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService){ } // o constructor cria uma variavel local, que posso manipular essa coisas


        @UseGuards(LocalAuthGuard) // a guard vai verificar dentro da minha strategy local que sao os usuarios e verificar elas 
        @HttpCode(HttpStatus.OK)
        @Post('/logar')
        async login (@Body() user: UsuarioLogin): Promise <any>{
            return this.authService.login(user)
        }
    
}