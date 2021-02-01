import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class ProblemBehaviorDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  description: string;

  @IsBoolean()
  isPercent: boolean;
}
