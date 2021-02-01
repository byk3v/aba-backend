import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCompetencyCheckParamsDto {
  @IsString()
  competencyCheckType: string;
 
  @IsString()
  description: string;

  @IsString()
  comment: string;
}
