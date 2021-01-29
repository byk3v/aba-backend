import { UsuarioDto } from '../../dto/usuarioDto';

export interface LoginStatus {
  username: string;
  accessToken: any;
  expiresIn: any;
}
