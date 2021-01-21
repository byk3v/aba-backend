import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioDto } from 'src/usuarios/dto/usuarioDto';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/payload.interface';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: /* process.env.SECRETKEY || */ 'ABA-SecretKey',
    });
  }

  async validate(payload: JwtPayload): Promise<UsuarioDto> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(private userService:UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: /* process.env.SECRETKEY || */ 'ABA-SecretKey',
      passReqToCallback:true
    });
  }

  async validate(req,payload: any) {

    var user = await this.userService.findOne(payload.username);
    if(!user){
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    if(req.body.refreshToken != (await user).refreshtoken){
      throw new HttpException('Invalid token', HttpStatus.AMBIGUOUS);
    }
    if( new Date() > new Date((await user).refreshtokenExpires)){
      throw new HttpException('Invalid token', HttpStatus.CONFLICT);
    }
    return { id: payload.sub, username: payload.username };
  }
}
