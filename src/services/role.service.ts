import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../domain/entity';
import { getConnection, Repository } from 'typeorm';
import { RolDto } from '../dto/rolDto';
import { toRolDto } from '../utils/mapper';
import { CreateRolDto } from '../dto/create-rol.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly RoleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<Role[]> {
    return await this.RoleRepository.find();
  }

  async getbyId(id: number) {
    const role = await this.RoleRepository.findOne(id);
    if (!role) throw new NotFoundException(`Rol doesn't exist`);
    return role;
  }

  async findRolesbyUser(userId: string): Promise<RolDto[]> {
    // return await this.RoleRepository.find({
    //   relations: ['users'],
    //   where: { users: userId },
    // });
    console.log('userId', userId);
    return await getConnection()
      .getRepository(Role)
      .createQueryBuilder('roles')
      .select('roles.name')
      .leftJoin('roles.users', 'users')
      .where('users.id = :userId', { userId })
      .getMany();
  }

  async createRol(dto: CreateRolDto): Promise<RolDto> {
    console.log(dto);
    const { name, description } = dto;

    const rolInDb = await this.RoleRepository.findOne({
      where: { name },
    });

    if (rolInDb) {
      throw new HttpException('Role already exist', HttpStatus.BAD_REQUEST);
    }

    const role: Role = await this.RoleRepository.create({
      name,
      description,
    });
    await this.RoleRepository.save(role);
    return toRolDto(role);
  }

  async editRol(id: string, dto: CreateRolDto) {
    const rol = await this.RoleRepository.findOne(id);
    if (!rol) throw new NotFoundException(`Rol doesn't exist`);

    const roleUpdated = Object.assign(rol, dto);
    return await this.RoleRepository.save(roleUpdated);
  }

  async deleteRol(id: number) {
    return await this.RoleRepository.delete(id);
  }
}
