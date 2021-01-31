import { IsString, IsNotEmpty } from 'class-validator';

export class CaregiverTypeDto {
  @IsNotEmpty()
  id: string;  
  
  @IsString()
  description: string;
}