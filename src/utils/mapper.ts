import { UserDto } from 'src/dto/userDto';
import { User } from '../domain/entity';

import { RolDto } from 'src/dto/rolDto';
import { Role } from '../domain/entity';
import { Diagnosis, BehaviorAnalysisCodes, ReplacementProgram, BehaviorProblem } from '../domain/entity';
import { DiagnosisDto } from '../dto/diagnosisDto';
import { ProblemBehaviorDto} from 'src/dto/problemBehavior.dto';
import { BehaviorAnalysisCodeDto } from 'src/dto/behaviorAnalysisCodeDto';
import { ReplacementProgramDto } from 'src/dto/replacementPrograms.dto'

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

export const toBehaviorAnalysisCodesDto = (data: BehaviorAnalysisCodes):BehaviorAnalysisCodeDto =>{
  const {id, hcpcs, description, checkable, color} = data;
  return {id, hcpcs, description, checkable, color};
}

export const toBehaviorProblemDto = (data: BehaviorProblem):ProblemBehaviorDto =>{
  const {id, description, active, isPercent} = data;
  return {id, description, active, isPercent};
}

export const toReplacementProgramDto = (data: ReplacementProgram):ReplacementProgramDto =>{
  const {id, description, active} = data;
  return {id, description, active};
}
