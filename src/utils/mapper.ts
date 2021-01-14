import { UsuarioDto } from 'src/usuarios/dto/usuarioDto';
import { Usuario } from '../usuarios/entities/usuario.entity'

export const toUserDto = (data: Usuario): UsuarioDto => {  
    const { id, username, email } = data;
    let userDto: UsuarioDto = { id, username, email,  };
    return userDto;
};