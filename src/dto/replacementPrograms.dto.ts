import { IsString, IsNotEmpty } from 'class-validator';

export class ReplacementProgramDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  description: string;

  @IsString()
  active: string;
}
