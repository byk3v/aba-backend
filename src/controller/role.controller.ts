import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRolDto } from '../dto/create-rol.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRoles() {
    const data = await this.RoleService.getRoles();
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getRol(@Param('id', ParseIntPipe) id: number) {
    return this.RoleService.getbyId(id);
  }

  @Post()
  crearRol(@Body() rol: CreateRolDto) {
    return this.RoleService.createRol(rol);
  }

  @Put(':id')
  modificarRol(@Body() rol: CreateRolDto, @Param('id') id) {
    return this.RoleService.editRol(id, rol);
  }

  @Delete(':id')
  eliminarRol(@Param('id') id) {
    return this.RoleService.deleteRol(id);
  }
}
