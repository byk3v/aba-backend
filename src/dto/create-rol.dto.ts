import { IsString } from 'class-validator';

export class CreateRolDto {
  @IsString()
  name: string;

  description: string;
}
