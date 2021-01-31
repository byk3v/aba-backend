import { IsString } from 'class-validator';

export class CreateDiagnosisDto {
  @IsString()
  code: string;

  @IsString()
  description: string;
}
