import { IsString, IsNotEmpty } from 'class-validator';

export class DiagnosisDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  code: string;

  @IsString()
  description: string;
}
