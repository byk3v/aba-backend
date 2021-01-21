import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  refreshtoken: string;

  refreshtokenExpires: string;
}
