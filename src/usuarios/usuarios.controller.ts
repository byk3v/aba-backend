import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly UsuarioService: UsuariosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsuarios() {
    const data = await this.UsuarioService.getUsuarios();
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.UsuarioService.getbyId(id);
    //return `este es el user de id: ${id}`;
  }

  @Post()
  crearUsuarios(@Body() usuario: CreateUsuarioDto) {
    return this.UsuarioService.createUsuario(usuario);
    //return usuario;
  }

  @Put(':id')
  modificarUsuarios(@Body() usuario: CreateUsuarioDto, @Param('id') id) {
    return this.UsuarioService.editUsuario(id, usuario);
  }

  @Delete(':id')
  eliminarUsuarios(@Param('id') id) {
    return this.UsuarioService.deleteUsuario(id);
    //  return `eliminando usuario numero ${id}` //alt + 96
  }
}
