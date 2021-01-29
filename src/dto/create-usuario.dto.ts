import { IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  username: string;

  password: string;

  @IsEmail()
  email: string;

  roles: number[];
}
