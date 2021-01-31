import { IsString, IsNotEmpty } from 'class-validator';

export class ReplacementProgramRead {
  @IsNotEmpty()
  id: string;

  @IsString()
  description: string;

  active: string;
}

export class ReplacementProgramDto {
  @IsString()
  description: string;

  active: string;
}
