import { IsString, IsNotEmpty } from 'class-validator';

export class BehaviorAnalysisCodeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  hcpcs: string;

  @IsString()
  description: string;


  @IsString()
  color: string;
}
