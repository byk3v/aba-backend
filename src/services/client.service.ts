import {HttpException, HttpStatus,Injectable,NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Client } from '../domain/entity';
  import { CreateCLientDto } from '../dto/create-client.dto';
  import { CLientDto } from '../dto/client.dto';
  import { toClientDto } from '../utils/mapper';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly ClientRepository: Repository<Client>,
  ) {}

  async getClients(code?: string, firstName?: string, lastName?: string, nickName?: string, dob?, phone?: string, email?: string, address?: string, city?: string, state?: string, zipcode?: string, gender?: string, race?: string, primaryLanguage?: string, emergencyContact?: string, emergencyPhone?: string, emergencyEmail?: string, notes?: string, socialSecurity?: string, insurance?: string, memberNo?: string, mmaPlan?: string, mmaIdNo?: string, active?: boolean): Promise<Client[]> {
    //Aqui hacer la busqueda con time ---papa mira el bulto de campos ese dios mio de la laif!!!
    return await this.ClientRepository.find();
  }

  async getbyId(id: number) {
    const clientes = await this.ClientRepository.findOne(id);
    if (!clientes) throw new NotFoundException(`Client doesn't exist`);
    return clientes;
  }

  async createClient(dto: CreateCLientDto): Promise<CLientDto> {
    const { code, firstName, lastName, nickName, dob, phone, email, address, city, state, zipcode, gender, race, primaryLanguage, emergencyContact, emergencyPhone, emergencyEmail, notes, socialSecurity, insurance, memberNo, mmaPlan, mmaIdNo, active } = dto;

    const clientInDb = await this.ClientRepository.findOne({
      where: { code },
    });

    if (clientInDb) {
      throw new HttpException(
        'Client already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cliente: Client = await this.ClientRepository.create({code, firstName, lastName, nickName, dob, phone, email, address, city, state, zipcode, gender, race, primaryLanguage, emergencyContact, emergencyPhone, emergencyEmail, notes, socialSecurity, insurance, memberNo, mmaPlan, mmaIdNo, active});
    await this.ClientRepository.save(cliente);
    return toClientDto(cliente);
  }

  async editClient(dto: CLientDto, id: number) {
    const cliente = await this.ClientRepository.findOne(id);
    if (!cliente) throw new NotFoundException(`Client doesn't exist`);

    const clientUpdated = Object.assign(cliente, dto);
    return await this.ClientRepository.save(clientUpdated);
  }

  async deleteClient(id: number) {
    return await this.ClientRepository.delete(id);
  }
}
