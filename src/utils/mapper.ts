import { UsuarioDto } from 'src/usuarios/dto/usuarioDto';
import { Usuario } from '../usuarios/entities/usuario.entity';

import { RolDto } from 'src/role/dto/rolDto';
import { Role } from '../role/entities/role.entity';
import { Diagnosis } from "../master-tables/diagnosis/entities/diagnosis.entity";
import { DiagnosisDto } from "../master-tables/diagnosis/dto/diagnosisDto";

export const toUserDto = (data: Usuario): UsuarioDto => {
  const { id, username, email, refreshtoken, refreshtokenExpires } = data;
  return { id, username, email, refreshtoken, refreshtokenExpires };
};

export const toRolDto = (data: Role): RolDto => {
  const { nombre, descripcion } = data;
  return { nombre, descripcion };
};

export const toDiagnosisDto = (data: Diagnosis): DiagnosisDto => {
  const { code, description } = data;
  return { code, description };
};