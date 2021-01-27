import { IsString, IsNotEmpty } from 'class-validator';

export class DiagnosisDto {
  @IsNotEmpty()
  code: string;

  @IsString()
  description: string;
}
