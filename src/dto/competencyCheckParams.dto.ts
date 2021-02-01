import { IsString, IsNotEmpty } from 'class-validator';

export class CompetencyCheckParamsDto {
  @IsNotEmpty()
  id: string;  

  @IsString()
  competencyCheckType: string;
 
  @IsString()
  description: string;

  @IsString()
  comment: string;
}
