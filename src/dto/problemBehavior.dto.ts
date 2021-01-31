import { IsString, IsNotEmpty } from 'class-validator';

export class ProblemBehaviorDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  description: string;

  @IsString()
  active: string;

  @IsString()
  isPercent: string;
}
