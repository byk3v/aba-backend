import { UsuarioDto } from 'src/usuarios/dto/usuarioDto';
import { Usuario } from '../usuarios/entities/usuario.entity';

import { RolDto } from 'src/role/dto/rolDto';
import { Role } from '../role/entities/role.entity';

export const toUserDto = (data: Usuario): UsuarioDto => {
  const { id, username, email, refreshtoken, refreshtokenExpires } = data;
  return { id, username, email, refreshtoken, refreshtokenExpires };
};

export const toRolDto = (data: Role): RolDto => {
  const { nombre, descripcion } = data;
  return { nombre, descripcion };
};
