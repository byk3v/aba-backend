import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-usuario.dto';
import { UserService } from '../services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    const data = await this.UserService.getUser();
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.getbyId(id);
    //return `este es el user de id: ${id}`;
  }

  @Post()
  createUser(@Body() usuario: CreateUserDto) {
    return this.UserService.createUser(usuario);
    //return usuario;
  }

  @Put(':id')
  updateUser(@Body() usuario: CreateUserDto, @Param('id') id) {
    return this.UserService.editUser(id, usuario);
  }

  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.UserService.deleteUser(id);
    //  return `eliminando usuario numero ${id}` //alt + 96
  }
}
