import { IsString } from 'class-validator';

export class CreateDiagnosisDto {
  code: string;

  @IsString()
  description: string;
}
