import { IsString, IsNotEmpty } from 'class-validator';

export class RolDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
}
