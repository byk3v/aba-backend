import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioDto } from 'src/usuarios/dto/usuarioDto';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:/* process.env.SECRETKEY || */'ABA-SecretKey',
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