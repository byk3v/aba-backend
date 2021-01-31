import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProblemBehaviorDto {
  @IsString()
  description: string;

  @IsString()
  active: string;

  @IsString()
  isPercent: string;
}
