import { IsString, IsNotEmpty } from 'class-validator';

export class DiagnosisDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  code: string;

  @IsString()
  description: string;
}
