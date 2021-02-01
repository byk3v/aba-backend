import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateProblemBehaviorDto {
  @IsString()
  description: string;

  @IsBoolean()
  isPercent: boolean;
}
