import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-usuario.dto';
import { User } from '../domain/entity';
import { UserDto } from '../dto/userDto';
import { toUserDto } from '../utils/mapper';
import { LoginUserDto } from '../dto/loginUserDto';
import { comparePasswords } from '../utils/utils';
import { Role } from '../domain/entity';
import { RoleRepository } from '../domain/repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User> /*@InjectRepository(Role)
        private readonly RoleRepository: Repository<Role>
        )*/,
  ) {}

  async getUser(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async getbyId(id: number) {
    const usuario = await this.UserRepository.findOne(id);
    if (!usuario) throw new NotFoundException('El User no existe');
    return usuario;
  }

  async findOne(options?: Record<string, unknown>): Promise<UserDto> {
    const user = await this.UserRepository.findOne(options);
    return toUserDto(user);
  }

  async saveUpdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshtokenExpires,
  ) {
    await this.UserRepository.update(id, {
      refreshtoken: refreshToken,
      refreshtokenExpires,
    });
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const sonIguales = await comparePasswords(user.password, password);

    if (!sonIguales) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const { username, password, email, roles } = dto;

    const userInDb = await this.UserRepository.findOne({
      where: { username },
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: User = await this.UserRepository.create({
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
    await this.UserRepository.save(user);
    return toUserDto(user);
  }

  async editUser(id: number, dto: CreateUserDto) {
    // Hacer un DTO para el modificar con los partial
    const usuario = await this.UserRepository.findOne(id);
    if (!usuario) throw new NotFoundException('El User no existe');

    const userUpdated = Object.assign(usuario, dto);
    return await this.UserRepository.save(userUpdated);
  }

  async deleteUser(id: number) {
    return await this.UserRepository.delete(id);
  }
}
