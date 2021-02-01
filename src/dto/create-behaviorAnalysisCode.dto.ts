import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBehaviorAnalysisCodeDto {
  @IsNotEmpty()
  hcpcs: string;

  @IsString()
  description: string;


  @IsString()
  color: string;
}
