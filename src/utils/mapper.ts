import { UserDto } from 'src/dto/userDto';
import { User } from '../domain/entity';

import { RolDto } from 'src/dto/rolDto';
import { Role } from '../domain/entity';
import { Diagnosis } from '../domain/entity';
import { DiagnosisDto } from '../dto/diagnosisDto';

export const toUserDto = (data: User): UserDto => {
  const { id, username, email, refreshtoken, refreshtokenExpires } = data;
  return { id, username, email, refreshtoken, refreshtokenExpires };
};

export const toRolDto = (data: Role): RolDto => {
  const { name, description } = data;
  return { name, description };
};

export const toDiagnosisDto = (data: Diagnosis): DiagnosisDto => {
  const { id, code, description } = data;
  return { id, code, description };
};
