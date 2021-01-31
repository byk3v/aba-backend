import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCaregiverTypeDto {
  @IsString()
  description: string;
}
