import { IsString, IsNotEmpty } from 'class-validator';

export class RolDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  descripcion: string;
}
