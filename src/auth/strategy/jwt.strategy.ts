import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

@Injectable()
export class JwtStrategy    extends PassportStrategy(Strategy){ // aqui vamos puxar strategy de jwt
    
constructor (){
    super ({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       ignoreExpiration: false, //aqui dizemos se ele tiver expirado nao vai aceitar, o nosso token tem validade que colocamos de 24 h que colocamos na nossa auth.module.
        secretOrKey: jwtConstants.secret
  
    })
}

async validate(payload: any){
    return {userId: payload.sub, username: payload.username}
}

}