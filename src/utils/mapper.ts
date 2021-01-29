import { UsuarioDto } from 'src/dto/usuarioDto';
import { Usuario } from '../domain/entity/usuario.entity';

import { RolDto } from 'src/dto/rolDto';
import { Role } from '../domain/entity/role.entity';
import { Diagnosis } from '../domain/entity/diagnosis.entity';
import { DiagnosisDto } from '../dto/diagnosisDto';

export const toUserDto = (data: Usuario): UsuarioDto => {
  const { id, username, email, refreshtoken, refreshtokenExpires } = data;
  return { id, username, email, refreshtoken, refreshtokenExpires };
};

export const toRolDto = (data: Role): RolDto => {
  const { nombre, descripcion } = data;
  return { nombre, descripcion };
};

export const toDiagnosisDto = (data: Diagnosis): DiagnosisDto => {
  const { id, code, description } = data;
  return { id, code, description };
};
