import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { DiagnosisDto } from './dto/diagnosisDto';
import { toDiagnosisDto } from '../../utils/mapper';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly DiagnosisRepository: Repository<Diagnosis>,
  ) {}

  async getDiagnosis(): Promise<Diagnosis[]> {
    return await this.DiagnosisRepository.find();
  }

  async getbyId(id: number) {
    const diagnosis = await this.DiagnosisRepository.findOne(id);
    if (!diagnosis) throw new NotFoundException(`Diagnosis doesn't exist`);
    return diagnosis;
  }

  async createDiagnosis(dto: CreateDiagnosisDto): Promise<DiagnosisDto> {
    const { code, description } = dto;

    const diagnosisInDb = await this.DiagnosisRepository.findOne({
      where: { code },
    });

    if (diagnosisInDb) {
      throw new HttpException(
        'Diagnosis already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const diagnosis: Diagnosis = await this.DiagnosisRepository.create({
      code,
      description,
    });
    await this.DiagnosisRepository.save(diagnosis);
    return toDiagnosisDto(diagnosis);
  }

  async editDiagnosis(id: number, dto: CreateDiagnosisDto) {
    const diagnosis = await this.DiagnosisRepository.findOne(id);
    if (!diagnosis) throw new NotFoundException(`Diagnosis doesn't exist`);

    const diagnosisUpdated = Object.assign(diagnosis, dto);
    return await this.DiagnosisRepository.save(diagnosisUpdated);
  }

  async deleteDiagnosis(ids: number[]) {
    return await this.DiagnosisRepository.delete(ids);
  }
}
