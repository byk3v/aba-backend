import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReplacementProgramDto {
  @IsString()
  description: string;

  @IsString()
  active: string;
}
