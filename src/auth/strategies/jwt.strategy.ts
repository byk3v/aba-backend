import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioDto } from 'src/dto/usuarioDto';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/payload.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: /* process.env.SECRETKEY || */ 'ABA-SecretKey',
      ignoreExpiration: true,
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
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refreshtoken',
) {
  constructor(private userService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: /* process.env.SECRETKEY || */ 'ABA-SecretKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new HttpException(
        'Invalid token: usuario incorrecto',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (req.body.refreshToken != (await user).refreshtoken) {
      throw new HttpException(
        'Invalid token: refreshToken incorrecto',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (new Date() > new Date((await user).refreshtokenExpires)) {
      throw new HttpException(
        'Invalid token: refreshToken expiró',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { username: payload.username, id: payload.id };
  }
}
