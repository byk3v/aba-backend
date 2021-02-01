import {HttpException, HttpStatus,Injectable,NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { CaregiversType } from '../domain/entity';
  import { CreateCaregiverTypeDto } from '../dto/create-caregiverType.dto';
  import { CaregiverTypeDto } from '../dto/caregiverType.dto';
  import { toCaregiverTypeDto } from '../utils/mapper';

@Injectable()
export class CaregiverTypeService {
  constructor(
    @InjectRepository(CaregiversType)
    private readonly CaregiverTypesRepository: Repository<CaregiversType>,
  ) {}

  async getCaregiversType(description?: string, ): Promise<CaregiversType[]> {
    if ( description ) {
      return await this.CaregiverTypesRepository.find({
        where: { description},
      });
    } 
     else return await this.CaregiverTypesRepository.find();
  }

  async getbyId(id: number) {
    const caregiverT = await this.CaregiverTypesRepository.findOne(id);
    if (!caregiverT) throw new NotFoundException(`Caregiver Type  doesn't exist`);
    return caregiverT;
  }

  async createCaregiverType(dto: CreateCaregiverTypeDto): Promise<CaregiverTypeDto> {
    const { description } = dto;

    const caregiverTInDb = await this.CaregiverTypesRepository.findOne({
      where: { description },
    });

    if (caregiverTInDb) {
      throw new HttpException(
        'Caregiver Tpye already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const caregiverT: CaregiversType = await this.CaregiverTypesRepository.create({ description});
    await this.CaregiverTypesRepository.save(caregiverT);
    return toCaregiverTypeDto(caregiverT);
  }

  async editCaregiverType(dto: CaregiverTypeDto, id: number) {
    const caregiverP = await this.CaregiverTypesRepository.findOne(id);
    if (!caregiverP) throw new NotFoundException(`CaregiverType doesn't exist`);

    const caregiverTypeUpdated = Object.assign(caregiverP, dto);
    return await this.CaregiverTypesRepository.save(caregiverTypeUpdated);
  }

  async deleteCaregiverTypes(id: number) {
    return await this.CaregiverTypesRepository.delete(id);
  }
}
