import { UsuarioDto } from '../../usuarios/dto/usuarioDto';

export interface LoginStatus {
  username: string;
  accessToken: any;
  expiresIn: any;
}
