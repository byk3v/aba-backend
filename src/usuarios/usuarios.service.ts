import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from './dto/usuarioDto';
import { toUserDto } from '../utils/mapper';
import { LoginUsuarioDto } from './dto/loginUsuarioDto';
import { comparePasswords } from 'src/utils/utils';
import { Role } from 'src/role/entities/role.entity';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly UsuarioRepository: Repository<Usuario> /*@InjectRepository(Role)
        private readonly RoleRepository: Repository<Role>
        )*/,
  ) {}

  async getUsuarios(): Promise<Usuario[]> {
    return await this.UsuarioRepository.find();
  }

  async getbyId(id: number) {
    const usuario = await this.UsuarioRepository.findOne(id);
    if (!usuario) throw new NotFoundException('El Usuario no existe');
    return usuario;
  }

  async findOne(options?: Record<string, unknown>): Promise<UsuarioDto> {
    const user = await this.UsuarioRepository.findOne(options);
    return toUserDto(user);
  }

  async saveUpdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshtokenExpires,
  ) {
    await this.UsuarioRepository.update(id, {
      refreshtoken: refreshToken,
      refreshtokenExpires,
    });
  }

  async findByLogin({
    username,
    password,
  }: LoginUsuarioDto): Promise<UsuarioDto> {
    const user = await this.UsuarioRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const sonIguales = await comparePasswords(user.password, password);

    if (!sonIguales) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ username }: any): Promise<UsuarioDto> {
    return await this.findOne({
      where: { username },
    });
  }

  async createUsuario(dto: CreateUsuarioDto): Promise<UsuarioDto> {
    const { username, password, email, roles } = dto;
    const rolesArray: Role[] = [];
    const userInDb = await this.UsuarioRepository.findOne({
      where: { username },
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: Usuario = await this.UsuarioRepository.create({
      username,
      password,
      email,
    });

    if (roles.length > 0) {
      const roleRepository: RoleRepository = await getConnection().getRepository(
        Role,
      );

      user.roles = await roleRepository.findByIds(roles);
    }
    await this.UsuarioRepository.save(user);
    return toUserDto(user);
  }

  async editUsuario(id: number, dto: CreateUsuarioDto) {
    // Hacer un DTO para el modificar con los partial
    const usuario = await this.UsuarioRepository.findOne(id);
    if (!usuario) throw new NotFoundException('El Usuario no existe');

    const userUpdated = Object.assign(usuario, dto);
    return await this.UsuarioRepository.save(userUpdated);
  }

  async deleteUsuario(id: number) {
    return await this.UsuarioRepository.delete(id);
  }
}
